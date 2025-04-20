import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  serverId: string;

  @IsNumber()
  cpuUsage: number;

  @IsNumber()
  memoryUsage: number;

  @IsNumber()
  diskUsage: number;

  @IsNumber()
  netIn: number;

  @IsNumber()
  netOut: number;

  @IsOptional()
  @IsNumber()
  loadAvg?: number;
}
