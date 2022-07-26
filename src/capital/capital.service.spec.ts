import { Test, TestingModule } from '@nestjs/testing';
import { CapitalService } from './capital.service';

describe('CapitalService', () => {
  let service: CapitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapitalService],
    }).compile();

    service = module.get<CapitalService>(CapitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
