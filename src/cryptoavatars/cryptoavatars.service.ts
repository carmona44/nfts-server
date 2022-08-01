import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { CryptoavatarFilterDto } from './dtos/cryptoavatar-filter.dto';
import { Cryptoavatar, CryptoavatarDocument } from './schemas/cryptoavatar.schema';

@Injectable()
export class CryptoavatarsService {

    constructor(
        @InjectModel(Cryptoavatar.name) private cryptoavatarModel: Model<CryptoavatarDocument>,
        private readonly httpService: HttpService
    ) {}

    async initCollection(): Promise<Cryptoavatar[]> {

        if((await this.cryptoavatarModel.find()).length > 0) { return []; }

        const OPENSEA_API_URL = 'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=cryptoavatars&include_orders=false';
        const response = await lastValueFrom(this.httpService.get(OPENSEA_API_URL));
        const assets = response.data.assets.map( asset => { return { ...asset, nftId: asset.id } });
        const cryptoavatars: Cryptoavatar[] = assets;

        return this.cryptoavatarModel.insertMany(cryptoavatars);
    }

    async find(queryParams: CryptoavatarFilterDto): Promise<Cryptoavatar[]> {
        return this.cryptoavatarModel.find(queryParams);
    }

    async findOne(id: string): Promise<Cryptoavatar> {
        return this.cryptoavatarModel.findOne({ name: id });
    }
    
}
