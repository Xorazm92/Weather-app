import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Weather extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lon: number;

  @Prop({ required: true })
  temp_c: number;

  @Prop({ required: true })
  temp_color: string;

  @Prop({ required: true })
  wind_kph: number;

  @Prop({ required: true })
  wind_color: string;

  @Prop({ required: true })
  cloud: number;

  @Prop({ required: true })
  cloud_color: string;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
