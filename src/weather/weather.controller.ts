import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetWeatherDto } from './dto/weather.dto';
import { JwtAuthGuard } from '../guard/index';

@ApiTags('weather')
@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Get weather data by cities' })
  @Post()
  getWeather(@Body() getWeatherDto: GetWeatherDto) {
    return this.weatherService.getWeatherByCity(getWeatherDto.cities);
  }
}
