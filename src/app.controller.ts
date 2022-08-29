import { Post } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { context, trace } from '@opentelemetry/api';
import { Logger } from 'nestjs-pino';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Calling getHello()', AppController.name);
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  getFile(@UploadedFile('file') file: any): string {
    console.log('Should log active span');
    const span = trace.getSpan(context.active());
    console.dir(span);
    span?.end();
    return this.appService.getHello();
  }
}
