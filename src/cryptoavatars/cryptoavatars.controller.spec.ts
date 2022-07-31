import { Test, TestingModule } from '@nestjs/testing';
import { CryptoavatarsController } from './cryptoavatars.controller';

describe('CryptoavatarsController', () => {
  let controller: CryptoavatarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoavatarsController],
    }).compile();

    controller = module.get<CryptoavatarsController>(CryptoavatarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
