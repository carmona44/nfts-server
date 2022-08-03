import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CryptoavatarFilterDto {

    @ApiPropertyOptional({ description: 'The exact URL of the asset image' })
    @IsOptional() 
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({ example: 'Girl', description: 'The asset\'s name' })
    @IsOptional() 
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: 'girl', description: 'The asset\'s description. It allows partial text search' })
    @IsOptional() 
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: '584488', description: 'The nftId of the asset' })
    @IsOptional() 
    @Type(() => Number) 
    @IsNumber()
    nftId?: number;

    @ApiPropertyOptional({ description: 'Owner address of the asset' })
    @IsOptional() 
    @IsString()
    'owner.address'?: string;

    @ApiPropertyOptional({ description: 'Owner profileImgUrl of the asset' })
    @IsOptional() 
    @IsString()
    'owner.profileImgUrl'?: string;

    @ApiPropertyOptional({ description: 'Owner address of the asset' })
    @IsOptional() 
    @IsString()
    'creator.address'?: string;

    @ApiPropertyOptional({ description: 'Owner profileImgUrl of the asset' })
    @IsOptional() 
    @IsString()
    'creator.profileImgUrl'?: string;

}