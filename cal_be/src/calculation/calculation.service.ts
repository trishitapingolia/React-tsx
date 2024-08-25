import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calculation } from './entities/calculation.entity';

@Injectable()
export class CalculationService {
  constructor(
    @InjectModel(Calculation.name) private calculationModel: Model<Calculation>,
  ) {}

  async calculate(expression: string): Promise<number> {
    const result = eval(expression.replace(/x/g, '*'));
    
    const calculation = new this.calculationModel({ expression, result });
    
    await calculation.save();
    
    return result;
  }

  // calculation history
  async getHistory(): Promise<Calculation[]> {
    return this.calculationModel.find().sort({ createdAt: -1 }).exec();
  }
}
