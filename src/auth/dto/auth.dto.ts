import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Talant' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Sadullayev' })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({ example: 'Talant07' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'Talant07' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
