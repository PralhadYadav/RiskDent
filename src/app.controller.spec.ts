import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppServiceMock } from './app.service.mock';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useClass: AppServiceMock
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {

    it('getHello function should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello Fraud!');
    });

    it('getTransactionDetails functions should return resposnse obj', () => {
      let getTransactionDetailsMock = jest.spyOn(appController, 'getTransactions')
      const res = appController.getTransactions('1', '1');
      expect(getTransactionDetailsMock).toHaveBeenCalled();
      expect(res['id']).toBe('5c868b2291d7da41e51f314a')
    })
  });


});
