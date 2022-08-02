import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParamsDto {

    @ApiPropertyOptional({ example: '10', description: 'The pagination skip param. Number of items to skip' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip?: number = 0;
    
    @ApiPropertyOptional({ example: '10', description: 'Number of items per page' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}