import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CryptoavatarFilterDto {

    @IsOptional() 
    @IsString()
    imageUrl?: string;

    @IsOptional() 
    @IsString()
    name?: string;

    @IsOptional() 
    @IsString()
    description?: string;

    @IsOptional() 
    @Type(() => Number) 
    @IsNumber()
    nftId?: number;
}