import { PrismaService } from './prisma.service';
import { CreateServerDto } from 'src/dtos/create-server.dto';
import { UpdateServerDto } from 'src/dtos/update-server.dto';
export declare class ServersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    }[]>;
    findById(id: string): import(".prisma/client").Prisma.Prisma__ServerClient<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(data: CreateServerDto): import(".prisma/client").Prisma.Prisma__ServerClient<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateServerDto): import(".prisma/client").Prisma.Prisma__ServerClient<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__ServerClient<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
