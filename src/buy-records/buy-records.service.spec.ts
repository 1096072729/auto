import { Test, TestingModule } from '@nestjs/testing';
import { BuyRecordsService } from './buy-records.service';

describe('BuyRecordsService', () => {
  let service: BuyRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyRecordsService],
    }).compile();

    service = module.get<BuyRecordsService>(BuyRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
