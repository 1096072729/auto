import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import cookieSession from 'cookie-session';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieSession({
      keys:['aaa']
    }));
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('signup',()=>{
    return request(app.getHttpServer())
    .post('/auth/signup')
    .send({email:'e2e@qq.com',password:'123456',role:'student'})
    .expect(201)
    .then((res)=>{
      console.log(res);
    })
  })
});
