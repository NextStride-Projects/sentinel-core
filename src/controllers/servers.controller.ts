import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiSecurity,
  ApiResponse,
} from '@nestjs/swagger';
import { ServersService } from 'src/services/servers.service';
import { CreateServerDto } from 'src/dtos/create-server.dto';
import { UpdateServerDto } from 'src/dtos/update-server.dto';

@ApiTags('Servers')
@ApiSecurity('api-key')
@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  @ApiOperation({ summary: 'List all registered servers' })
  @ApiResponse({ status: 200, description: 'List of servers returned' })
  findAll() {
    return this.serversService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get server by ID' })
  @ApiResponse({ status: 200, description: 'Server found' })
  @ApiResponse({ status: 404, description: 'Server not found' })
  findById(@Param('id') id: string) {
    return this.serversService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create/register a new server' })
  @ApiResponse({ status: 201, description: 'Server created' })
  create(@Body() dto: CreateServerDto) {
    return this.serversService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update a server's information" })
  @ApiResponse({ status: 200, description: 'Server updated' })
  update(@Param('id') id: string, @Body() dto: UpdateServerDto) {
    return this.serversService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a server' })
  @ApiResponse({ status: 204, description: 'Server deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.serversService.delete(id);
  }
}
