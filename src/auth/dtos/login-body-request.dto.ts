import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginBodyRequestDto {

    @ApiProperty({ example: 'cryptoavatar', description: 'Username of the user that want to log in' })
    @IsString()
    username: string;
    
    @ApiProperty({ example: '1234', description: 'Password of the user that want to log in' })
    @IsString()
    password: string;

}