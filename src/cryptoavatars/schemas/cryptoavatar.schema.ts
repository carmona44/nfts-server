import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type CryptoavatarDocument = Cryptoavatar & Document;

@Schema({ versionKey: false })
export class Cryptoavatar {

    @Prop()
    imageUrl: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    nftId: number;

    @Prop(raw({
        profileImgUrl: { type: String },
        address: { type: String }
    }))
    creator: {
        profileImgUrl: string,
        address: string
    };

    @Prop(raw({
        profileImgUrl: { type: String },
        address: { type: String }
    }))
    owner: {
        profileImgUrl: string,
        address: string
    };

}

export const CryptoavatarSchema = SchemaFactory.createForClass(Cryptoavatar);