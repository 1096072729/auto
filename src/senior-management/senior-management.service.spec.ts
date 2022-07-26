import { Test, TestingModule } from '@nestjs/testing';
import { SeniorManagementService } from './senior-management.service';

describe('SeniorManagementService', () => {
  let service: SeniorManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorManagementService],
    }).compile();

    service = module.get<SeniorManagementService>(SeniorManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
