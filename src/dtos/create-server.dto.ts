import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  ip: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  tags: string[];
}
