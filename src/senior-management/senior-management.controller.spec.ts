import { Test, TestingModule } from '@nestjs/testing';
import { SeniorManagementController } from './senior-management.controller';

describe('SeniorManagementController', () => {
  let controller: SeniorManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeniorManagementController],
    }).compile();

    controller = module.get<SeniorManagementController>(SeniorManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
