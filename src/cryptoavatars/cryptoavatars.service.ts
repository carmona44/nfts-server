import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { CryptoavatarFilterDto } from './dtos/cryptoavatar-filter.dto';
import { PaginationParamsDto } from './dtos/pagination-params.dto';
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

    async find(queryParams: CryptoavatarFilterDto, paginationParams: PaginationParamsDto, url: string): Promise<any> {
        const API_NFTS_SERVER = 'http://localhost:3000';
        const { skip, limit } = paginationParams;
        const query = { 
            ...queryParams, 
            ...queryParams.description ? { description: { $regex: queryParams.description, $options: 'i'} } : {} 
        };
        const totalDataItems = await this.cryptoavatarModel.find(query).countDocuments();
        const totalPages = Math.floor((totalDataItems / limit) + 0.99) || 1;
        const currentPage = Math.ceil((skip - 1) / limit) + 1 || 1;
        const data = await this.cryptoavatarModel
            .find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
        let nextPage = new URL(`${API_NFTS_SERVER}${url}`);
        nextPage.searchParams.set('skip', `${skip + limit}`);
        let prevPage = new URL(`${API_NFTS_SERVER}${url}`);
        prevPage.searchParams.set('skip', `${skip - limit}`);

        return { 
            data, 
            pagination: {
                nextPage: (currentPage < totalPages) ? nextPage : "",
                prevPage: (currentPage > 1) ? prevPage : "",
                currentPage,
                totalPages,
                totalDataItems
            } 
        };
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
