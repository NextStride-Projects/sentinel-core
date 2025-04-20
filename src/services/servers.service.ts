import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateServerDto } from 'src/dtos/create-server.dto';
import { UpdateServerDto } from 'src/dtos/update-server.dto';

@Injectable()
export class ServersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.server.findMany();
  }

  findById(id: string) {
    return this.prisma.server.findUnique({ where: { id } });
  }

  create(data: CreateServerDto) {
    return this.prisma.server.create({ data });
  }

  update(id: string, data: UpdateServerDto) {
    return this.prisma.server.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.server.delete({ where: { id } });
  }
}
