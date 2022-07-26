import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
const cookieSession = require('cookie-session');

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); //处理跨域

  // 静态文件托管
  app.useStaticAssets('uploads', { prefix: '/uploads' });
  
  //设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
  .setTitle('普榜自动发卡后台Api可视化文档')
  .setDescription('更快了解后台接口,方便前端开发人员调用')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('doc',app,document);

  app.use(cookieSession({
    keys:['qazwsxedc']
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
  
  await app.listen(3000);
}
bootstrap();
