import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Auth')
@ApiSecurity('api-key')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return encrypted token' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Public()
  @Post('verify')
  @ApiOperation({ summary: 'Verify encrypted JWT token' })
  verifyToken(@Headers('authorization') header: string) {
    const token = header?.replace(/^Bearer\s/, '');
    return this.authService.verifyToken(token);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a new user' })
  createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  findAll() {
    return this.authService.findAllUsers();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.authService.findUser(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.authService.updateUser(id, body);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
