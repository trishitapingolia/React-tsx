import { Controller, Post, Body, Get } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Post()
  async calculate(@Body('expression') expression: string): Promise<{ result: number }> {
    const result = await this.calculationService.calculate(expression);
    return { result };
  }

  @Get('history')
  async getHistory() {
    return this.calculationService.getHistory();
  }
}
