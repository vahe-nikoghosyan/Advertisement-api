import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in a user and get a JWT token' })
  @ApiBody({
    description:
      'Login with username and password. Use admin credentials for admin access.',
    type: LoginDto,
    examples: {
      admin: {
        summary: 'Admin Login',
        description: 'Use this login for accessing admin features',
        value: {
          username: 'admin',
          password: 'admin123',
        },
      },
      user: {
        summary: 'Regular User Login',
        description: 'Use this login for accessing regular user features',
        value: {
          username: 'user',
          password: 'user123',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
