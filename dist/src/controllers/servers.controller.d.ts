import { ServersService } from 'src/services/servers.service';
import { CreateServerDto } from 'src/dtos/create-server.dto';
import { UpdateServerDto } from 'src/dtos/update-server.dto';
export declare class ServersController {
    private readonly serversService;
    constructor(serversService: ServersService);
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
    create(dto: CreateServerDto): import(".prisma/client").Prisma.Prisma__ServerClient<{
        id: string;
        name: string;
        ip: string;
        tags: string[];
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateServerDto): import(".prisma/client").Prisma.Prisma__ServerClient<{
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
