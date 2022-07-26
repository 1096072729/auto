import { Test, TestingModule } from '@nestjs/testing';
import { JwtDemoService } from './jwt-demo.service';

describe('JwtDemoService', () => {
  let service: JwtDemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtDemoService],
    }).compile();

    service = module.get<JwtDemoService>(JwtDemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
