import { Test, TestingModule } from '@nestjs/testing';
import { LinkEncryptController } from './link-encrypt.controller';

describe('LinkEncryptController', () => {
  let controller: LinkEncryptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkEncryptController],
    }).compile();

    controller = module.get<LinkEncryptController>(LinkEncryptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
