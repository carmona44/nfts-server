import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParamsDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip?: number = 0;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}