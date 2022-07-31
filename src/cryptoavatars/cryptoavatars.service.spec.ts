import { Test, TestingModule } from '@nestjs/testing';
import { CryptoavatarsService } from './cryptoavatars.service';

describe('CryptoavatarsService', () => {
  let service: CryptoavatarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoavatarsService],
    }).compile();

    service = module.get<CryptoavatarsService>(CryptoavatarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
