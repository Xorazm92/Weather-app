import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class GetWeatherDto {
  @ApiProperty({ example: ['Tashkent', 'Moscow'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  cities: string[];
}