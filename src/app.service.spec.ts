import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppController', () => {
    let service: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).compile();
        service = app.get<AppService>(AppService)
    })

    it("should be define", () => {
        expect(service).toBeDefined()
    })
})