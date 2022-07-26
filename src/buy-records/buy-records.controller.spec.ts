import { Test, TestingModule } from '@nestjs/testing';
import { BuyRecordsController } from './buy-records.controller';

describe('BuyRecordsController', () => {
  let controller: BuyRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyRecordsController],
    }).compile();

    controller = module.get<BuyRecordsController>(BuyRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
