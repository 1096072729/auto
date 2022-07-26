import { Test, TestingModule } from '@nestjs/testing';
import { JwtDemoController } from './jwt-demo.controller';

describe('JwtDemoController', () => {
  let controller: JwtDemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtDemoController],
    }).compile();

    controller = module.get<JwtDemoController>(JwtDemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
