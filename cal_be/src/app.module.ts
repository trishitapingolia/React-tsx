import { Module } from '@nestjs/common';
import { CalculationModule } from './calculation/calculation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/calculator'),CalculationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
