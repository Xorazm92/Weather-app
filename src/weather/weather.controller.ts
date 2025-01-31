import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetWeatherDto } from './dto/weather.dto';
import { AuthGuard } from '../guard/auth.guard';

@ApiTags('weather')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Get weather data by cities' })
  @Post()
  getWeather(@Body() getWeatherDto: GetWeatherDto) {
    return this.weatherService.getWeatherByCity(getWeatherDto.cities);
  }
}
