import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CryptoavatarsService } from './cryptoavatars.service';

@Controller('cryptoavatars')
export class CryptoavatarsController {

    constructor(
        private cryptoavatarsService: CryptoavatarsService,
    ) {}

    @Post('init')
    async initCollection() {
        return this.cryptoavatarsService.initCollection();
    }

    /*@Get()
    async findAll(@Query() params) {

    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        
    }*/
}
