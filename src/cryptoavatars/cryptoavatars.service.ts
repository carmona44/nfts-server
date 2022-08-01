import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

    async initCollection(): Promise<string> {

        if((await this.cryptoavatarModel.find()).length > 0) { return 'Assets have already been loaded.' }

        try {
            const OPENSEA_API_URL = 'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=cryptoavatars&include_orders=false';
            const response = await lastValueFrom(this.httpService.get(OPENSEA_API_URL));
            const assets: Cryptoavatar[] = response.data.assets.map( asset => this.serializeAsset(asset) );
    
            const cryptoavatars = await this.cryptoavatarModel.insertMany(assets);
            
            return `Loaded ${cryptoavatars.length} assets successfully!`;
        } catch (err) {
            if (!err.response) { throw new InternalServerErrorException(); }
            throw new BadRequestException(`Error loading assets: ${err.toString()}`);
        }
    }

    async find(queryParams: CryptoavatarFilterDto): Promise<Cryptoavatar[]> {
        return this.cryptoavatarModel.find(queryParams);
    }

    async findOne(id: string): Promise<Cryptoavatar> {
        return this.cryptoavatarModel.findOne({ name: id });
    }

    serializeAsset(asset): Cryptoavatar {
        return {
            ...asset,
            nftId: asset.id,
            owner: { 
                profileImgUrl: asset.owner?.profile_img_url, 
                address: asset.owner?.address 
            },
            creator: { 
                profileImgUrl: asset.creator?.profile_img_url, 
                address: asset.creator?.address 
            }
        };
    }
    
}
