import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CalculationController } from './calculation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calculation, CalculationSchema } from './entities/calculation.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Calculation.name, schema: CalculationSchema }])],
  controllers: [CalculationController],
  providers: [CalculationService],
})
export class CalculationModule {}
