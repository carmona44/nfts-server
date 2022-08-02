import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CryptoavatarsService } from './cryptoavatars.service';
import { CryptoavatarFilterDto } from './dtos/cryptoavatar-filter.dto';
import { PaginationParamsDto } from './dtos/pagination-params.dto';
import { Cryptoavatar } from './schemas/cryptoavatar.schema';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Cryptoavatars')
@Controller('cryptoavatars')
export class CryptoavatarsController {

    constructor(
        private readonly cryptoavatarsService: CryptoavatarsService,
    ) {}

    @Post('init')
    @ApiOperation({ summary: 'Load the Opensea Cryptoavatars collection into a MongoDB collection' })
    async initCollection(): Promise<string> {
        return this.cryptoavatarsService.initCollection();
    }

    @Get()
    @ApiOperation({ summary: 'Find and serve a list of Cryptoavatars. It allows search filters and pagination' })
    async find(@Req() req: Request, @Query() queryParams: CryptoavatarFilterDto, @Query() paginationParams: PaginationParamsDto): Promise<any> {
        return this.cryptoavatarsService.find(queryParams, paginationParams, req.url);
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Find one Cryptoavatar by ID' })
    @ApiParam({ name: 'id', description: 'The nftId of the asset that we want to see on details' })
    async findOne(@Param('id') id: string): Promise<Cryptoavatar> {
        return this.cryptoavatarsService.findOne(id);
    }
}
