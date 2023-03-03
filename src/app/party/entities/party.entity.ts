import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type PartyDocument = HydratedDocument<Party>;

@Schema()
export class Party {
    @Prop({
        maxlength: 500,
        unique: true
    })
    name: string;

    @Prop({
        maxLength: 500,
        unique: true
    })
    acronym: string;

    @Prop({
        maxLength: 500
    })
    logo: string;

    @Prop({
        maxLength: 500
    })
    chairman: string;

    @Prop({
        default: Date.now(),
        required: true
    })
    createdAt: Date;

    @Prop({
        required: true,
        default: Date.now()
    })
    updatedAt: Date;
}

export const PartySchema = SchemaFactory.createForClass(Party);

