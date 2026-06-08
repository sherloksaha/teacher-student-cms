import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService){}

  getHello(): string {
    const serviceName = this.configService.get<string>('appName');
    console.log(serviceName);
    return `Hello World! from ${serviceName}`;
  }
}
