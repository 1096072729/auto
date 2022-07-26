import { Test, TestingModule } from '@nestjs/testing';
import { LinkEncryptService } from './link-encrypt.service';

describe('LinkEncryptService', () => {
  let service: LinkEncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkEncryptService],
    }).compile();

    service = module.get<LinkEncryptService>(LinkEncryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
