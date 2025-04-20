"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const serverName = 'Private Home Server';
    const serverIP = '10.8.0.2';
    const tags = ['home', 'private', 'vpn'];
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
        { metricType: client_1.MetricType.CPU, value: 80, level: client_1.AlertLevel.WARNING },
        { metricType: client_1.MetricType.MEMORY, value: 85, level: client_1.AlertLevel.WARNING },
        { metricType: client_1.MetricType.DISK, value: 90, level: client_1.AlertLevel.WARNING },
        { metricType: client_1.MetricType.NET_IN, value: 10000, level: client_1.AlertLevel.INFO },
        { metricType: client_1.MetricType.NET_OUT, value: 10000, level: client_1.AlertLevel.INFO },
        { metricType: client_1.MetricType.LOAD_AVG, value: 5, level: client_1.AlertLevel.CRITICAL },
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
//# sourceMappingURL=seed.js.map