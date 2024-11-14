import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username of the user', example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password of the user', example: 'password123' })
  @IsString()
  password: string;
}
