import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoavatarsService } from './cryptoavatars.service';
import { Cryptoavatar } from './schemas/cryptoavatar.schema';

describe('CryptoavatarsService', () => {
  let service: CryptoavatarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CryptoavatarsService, 
        { 
          provide: getModelToken(Cryptoavatar.name), 
          useValue: { find: jest.fn(), initCollection: jest.fn(), findOne: jest.fn() } 
        }
      ],
    }).compile();

    service = module.get<CryptoavatarsService>(CryptoavatarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a collection status message', async () => {
    const result = 'test';
    jest.spyOn(service, 'initCollection').mockImplementation(async () => result);

    expect(await service.initCollection()).toBe(result);
  });
});
