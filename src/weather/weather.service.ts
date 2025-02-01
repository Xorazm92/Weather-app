import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './schemas/weather.schema';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  private getColorByTemp(temp: number): string {
    if (temp <= -30) return '#003366';
    if (temp <= -20) return '#4A90E2';
    if (temp <= -10) return '#B3DFFD';
    if (temp <= 0) return '#E6F7FF';
    if (temp <= 10) return '#D1F2D3';
    if (temp <= 20) return '#FFFACD';
    if (temp <= 30) return '#FFCC80';
    if (temp <= 40) return '#FF7043';
    return '#D32F2F';
  }

  private getColorByWind(speed: number): string {
    if (speed <= 10) return '#E0F7FA';
    if (speed <= 20) return '#B2EBF2';
    if (speed <= 40) return '#4DD0E1';
    if (speed <= 60) return '#0288D1';
    return '#01579B';
  }

  private getColorByCloud(coverage: number): string {
    if (coverage <= 10) return '#FFF9C4';
    if (coverage <= 30) return '#FFF176';
    if (coverage <= 60) return '#E0E0E0';
    if (coverage <= 90) return '#9E9E9E';
    return '#616161';
  }

  private async getAllCountries(): Promise<string[]> {
    try {
      const filePath = path.join(process.cwd(), 'src', 'json', 'country-name.json');
      const data = await fs.promises.readFile(filePath, 'utf8');
      const countries = JSON.parse(data);
      return countries.map(country => country.name);
    } catch (error) {
      console.error('Error reading countries file:', error);
      return [];
    }
  }

  @Cron('*/1 * * * *')
  async updateWeatherData() {
    try {
      const cities = [
        'Tashkent',
        'Samarkand',
        'Bukhara',
        'Namangan',
        'Andijan',
        'Fergana',
        'Jizzakh',
        'Karshi',
        'Gulistan',
        'Urgench',
      ];
      for (const city of cities) {
        const weatherData = await this.fetchWeatherData(city);
        await this.weatherModel.findOneAndUpdate({ name: city }, weatherData, {
          upsert: true,
        });
      }
    } catch (error) {
      console.error('Weather update failed:', error);
    }
  }

  private async fetchWeatherData(city: string) {
    try {
      const apiKey = process.env.WEATHER_API_KEY;
      const encodedCity = encodeURIComponent(city);
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodedCity}`;

      const response = await axios.get(url);
      const data = response.data;

      return {
        name: city, 
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        temp_c: data.current.temp_c,
        temp_color: this.getColorByTemp(data.current.temp_c),
        wind_kph: data.current.wind_kph,
        wind_color: this.getColorByWind(data.current.wind_kph),
        cloud: data.current.cloud,
        cloud_color: this.getColorByCloud(data.current.cloud),
      };
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw new BadRequestException(`Failed to fetch weather data for ${city}`);
    }
  }

  async getWeatherByCity(cities: string[]) {
    try {
      const allCountries = await this.getAllCountries();
      const results = [];

      for (const city of cities) {
        // Avval bazadan qidiramiz
        let weatherData = await this.weatherModel.findOne({ name: city }).exec();

        // Agar bazada bo'lmasa, API dan olamiz
        if (!weatherData) {
          const newWeatherData = await this.fetchWeatherData(city);
          weatherData = await this.weatherModel.create(newWeatherData);
        }

        // Davlat ro'yxatda borligini tekshiramiz
        const isValidCountry = allCountries.includes(weatherData.country);
        
        results.push({
          ...weatherData.toObject(),
          isValidCountry
        });
      }

      return results;
    } catch (error) {
      throw new BadRequestException('Failed to get weather data');
    }
  }
}
