import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '欢迎使用普榜自动发卡后台Api可视化文档!';
  }
}
