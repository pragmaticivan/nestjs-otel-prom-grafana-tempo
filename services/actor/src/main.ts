import otelSDK from './instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  otelSDK.start();
  console.log('Started OTEL SDK');

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));

  app.enableShutdownHooks();
  app.enableCors({ origin: '*' });

  const options = new DocumentBuilder()
    .setTitle('nestjs-otel - actor service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5556);
}
bootstrap();
