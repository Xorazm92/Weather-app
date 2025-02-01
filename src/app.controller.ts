import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Welcome to Weather API',
      documentation: '/api/docs',
      endpoints: {
        auth: {
          register: '/api/auth/register',
          login: '/api/auth/login'
        },
        weather: '/api/weather'
      }
    };
  }
}
