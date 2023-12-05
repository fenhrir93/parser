import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import parse from 'node-html-parser';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getLinks(link: string) {
    const urls = [];
    const page = await axios.get(link);
    const parsedImgLinks = parse(page.data).querySelectorAll('img');
    const parsedLinks = parse(page.data).querySelectorAll('a');
    let index = 0;
    for (let el of parsedImgLinks) {
      // console.log(el.rawAttributes.src);
      // remove px from string;
      if (parsedImgLinks.indexOf(el) === 50) break;
      urls.push({ url: el.rawAttributes.src, id: Math.random() });
      console.log(parsedLinks[index].rawAttributes.href);
      index++;
    }

    fs.createWriteStream('logs.json').write(JSON.stringify(urls));

    return urls;
  }
}
