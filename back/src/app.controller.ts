import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import * as fs from 'fs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getLink(@Body() body) {
    return this.appService.getLinks(body.url);
  }

  @Post('/download')
  async download(@Body() body: { url: string; id: number }) {
    const response = await axios.get(body.url, { responseType: 'arraybuffer' });
    fs.writeFile(body.id + '.jpg', response.data, (err) => {
      console.log(err);
    });
  }
}
