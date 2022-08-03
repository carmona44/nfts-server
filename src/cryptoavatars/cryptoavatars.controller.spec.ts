import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptoavatarsController } from './cryptoavatars.controller';
import { CryptoavatarsService } from './cryptoavatars.service';
import { Cryptoavatar } from './schemas/cryptoavatar.schema';
import * as mocks from 'node-mocks-http';

describe('CryptoavatarsController', () => {
  let controller: CryptoavatarsController;
  let service: CryptoavatarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CryptoavatarsController],
      providers: [CryptoavatarsService, { provide: getModelToken(Cryptoavatar.name), useValue: jest.fn() }]
    }).compile();

    controller = module.get<CryptoavatarsController>(CryptoavatarsController);
    service = module.get<CryptoavatarsService>(CryptoavatarsService);
  });

  describe('initCollection', () => {
    it('should return a collection status message', async () => {
      const result = 'test';
      jest.spyOn(service, 'initCollection').mockImplementation(async () => result);

      expect(await controller.initCollection()).toBe(result);
    });
  });

  describe('find', () => {
    it('should return an array of cryptoavatars', async () => {
      const result = [new Cryptoavatar()];
      jest.spyOn(service, 'find').mockImplementation(async () => result);

      const req = mocks.createRequest();
      expect(await controller.find(req,{},{})).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one cryptoavatar', async () => {
      const result = new Cryptoavatar();
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('584488')).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
