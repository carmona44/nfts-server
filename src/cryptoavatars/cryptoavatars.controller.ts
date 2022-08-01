import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CryptoavatarsService } from './cryptoavatars.service';
import { CryptoavatarFilterDto } from './dtos/cryptoavatar-filter.dto';
import { PaginationParamsDto } from './dtos/pagination-params.dto';
import { Cryptoavatar } from './schemas/cryptoavatar.schema';
import { Request } from 'express';

@Controller('cryptoavatars')
export class CryptoavatarsController {

    constructor(
        private readonly cryptoavatarsService: CryptoavatarsService,
    ) {}

    @Post('init')
    async initCollection(): Promise<string> {
        return this.cryptoavatarsService.initCollection();
    }

    @Get()
    async find(@Req() req: Request, @Query() queryParams: CryptoavatarFilterDto, @Query() paginationParams: PaginationParamsDto): Promise<any> {
        return this.cryptoavatarsService.find(queryParams, paginationParams, req.url);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cryptoavatar> {
        return this.cryptoavatarsService.findOne(id);
    }
}
