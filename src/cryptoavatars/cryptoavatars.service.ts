import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cryptoavatar, CryptoavatarDocument } from './schemas/cryptoavatar.schema';

@Injectable()
export class CryptoavatarsService {

    constructor(
        @InjectModel(Cryptoavatar.name) private cryptoavatarModel: Model<CryptoavatarDocument>
    ) {}

    async initCollection(): Promise<string> {
        
        //const cryptoavatars = this.cryptoavatarModel.insertMany();
        return 'Se ha creado la colección Cryptoavatars';
    }
}
