import { PrismaClient, AlertLevel, MetricType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const serverName = 'Private Home Server';
  const serverIP = '10.8.0.2';
  const tags = ['home', 'private', 'vpn'];

  // Optional: clear database first
  // await prisma.threshold.deleteMany();
  // await prisma.metric.deleteMany();
  // await prisma.alert.deleteMany();
  // await prisma.server.deleteMany();

  const server = await prisma.server.upsert({
    where: { ip: serverIP },
    update: {
      name: serverName,
      tags,
    },
    create: {
      name: serverName,
      ip: serverIP,
      tags,
    },
  });

  console.log(`✅ Server created: ${server.name} (${server.ip})`);

  const defaultThresholds = [
    { metricType: MetricType.CPU, value: 80, level: AlertLevel.WARNING },
    { metricType: MetricType.MEMORY, value: 85, level: AlertLevel.WARNING },
    { metricType: MetricType.DISK, value: 90, level: AlertLevel.WARNING },
    { metricType: MetricType.NET_IN, value: 10000, level: AlertLevel.INFO },   // KB/s
    { metricType: MetricType.NET_OUT, value: 10000, level: AlertLevel.INFO },
    { metricType: MetricType.LOAD_AVG, value: 5, level: AlertLevel.CRITICAL },
  ];

  for (const threshold of defaultThresholds) {
    await prisma.threshold.upsert({
      where: {
        serverId_metricType: {
          serverId: server.id,
          metricType: threshold.metricType,
        },
      },
      update: {
        value: threshold.value,
        level: threshold.level,
        enabled: true,
      },
      create: {
        serverId: server.id,
        ...threshold,
      },
    });

    console.log(`🔧 Threshold set for ${threshold.metricType}`);
  }

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
