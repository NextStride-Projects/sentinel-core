import { PrismaService } from './prisma.service';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    updateUser(id: string, data: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findAllUsers(): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findUser(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    } | null>;
    deleteUser(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    verifyToken(encryptedToken: string): {
        valid: boolean;
        payload: string | jwt.JwtPayload;
    };
}
