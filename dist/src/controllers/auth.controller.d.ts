import { AuthService } from 'src/services/auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        token: string;
    }>;
    verifyToken(header: string): {
        valid: boolean;
        payload: string | import("jsonwebtoken").JwtPayload;
    };
    createUser(body: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findAll(): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    } | null>;
    updateUser(id: string, body: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
