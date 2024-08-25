import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Calculation extends Document {
  @Prop({ required: true })
  expression: string;

  @Prop({ required: true })
  result: number;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation);
