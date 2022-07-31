import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoavatarsModule } from './cryptoavatars/cryptoavatars.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: 'mongodb://localhost/nfts' })
    }),
    CryptoavatarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
