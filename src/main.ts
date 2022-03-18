import { LoggerInterceptor } from './common/interceptor/logger.interceptor';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { constant } from './common/constants/constant';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix(constant.PREFIX.api_prefix)
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(3000);
}
bootstrap();
