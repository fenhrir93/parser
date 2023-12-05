import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getLink(@Body() body) {
    return this.appService.getLinks(body.url);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
