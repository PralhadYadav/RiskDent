import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

/**
* @description AppController is first controller get loaded with api end point.
*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
* @description getHello is default route which return static string response.
*/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
* @description getTransactions is transactions router which will return response based on transactionId & confidenceLevel route params.
*/
  @Get('transactions')
  getTransactions(@Query('transactionId') transactionId: string,
    @Query('confidenceLevel') confidenceLevel: string): object {
    return this.appService.getTransactionDetails(transactionId, confidenceLevel);
  }
}
