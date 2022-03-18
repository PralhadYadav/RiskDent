import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('transactions')
  getTransactions(@Query('transactionId') transactionId: string,
    @Query('confidenceLevel') confidenceLevel: string): object {
    return this.appService.getTransactionDetails(transactionId, confidenceLevel);
  }
}
