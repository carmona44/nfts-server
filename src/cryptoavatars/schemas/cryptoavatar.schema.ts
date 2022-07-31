import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CryptoavatarDocument = Cryptoavatar & Document;

@Schema()
export class Cryptoavatar {

    @Prop()
    image_url: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    nftId: number;

    /*@Prop()
    creator: any;

    @Prop()
    owner: any;*/

}

export const CryptoavatarSchema = SchemaFactory.createForClass(Cryptoavatar);