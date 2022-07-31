import { Module } from '@nestjs/common';
import { CryptoavatarsService } from './cryptoavatars.service';
import { CryptoavatarsController } from './cryptoavatars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cryptoavatar, CryptoavatarSchema } from './schemas/cryptoavatar.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cryptoavatar.name, schema: CryptoavatarSchema }]),
    HttpModule
  ],
  providers: [CryptoavatarsService],
  controllers: [CryptoavatarsController]
})
export class CryptoavatarsModule {}
