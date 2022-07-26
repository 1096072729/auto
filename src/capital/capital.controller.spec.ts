import { Test, TestingModule } from '@nestjs/testing';
import { CapitalController } from './capital.controller';

describe('CapitalController', () => {
  let controller: CapitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapitalController],
    }).compile();

    controller = module.get<CapitalController>(CapitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
