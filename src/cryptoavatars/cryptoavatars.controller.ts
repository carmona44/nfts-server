import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CryptoavatarsService } from './cryptoavatars.service';
import { CryptoavatarFilterDto } from './dtos/cryptoavatar-filter.dto';
import { Cryptoavatar } from './schemas/cryptoavatar.schema';

@Controller('cryptoavatars')
export class CryptoavatarsController {

    constructor(
        private readonly cryptoavatarsService: CryptoavatarsService,
    ) {}

    @Post('init')
    async initCollection(): Promise<Cryptoavatar[]> {
        return this.cryptoavatarsService.initCollection();
    }

    @Get()
    async find(@Query() queryParams: CryptoavatarFilterDto): Promise<Cryptoavatar[]> {
        return this.cryptoavatarsService.find(queryParams);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Cryptoavatar> {
        return this.cryptoavatarsService.findOne(id);
    }
}
