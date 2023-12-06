import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getLinks(link: string) {
    const urls = [];
    const page = await axios.get(link);
    fs.writeFileSync('logs.json', JSON.stringify(page.data));

    const urlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|webp)\b/g;

    const matches = page.data.match(urlRegex);
    const uniqueMatches = new Set<string>(matches);
    const uniqueMatchesArray = Array.from(uniqueMatches);

    for (let i = 0; i < uniqueMatchesArray.length; i++) {
      if (i === 50) break;
      urls.push({
        url: uniqueMatchesArray[i].replace(/_\d+px/, ''),
        id: i,
      });
    }

    return urls;
  }
}
