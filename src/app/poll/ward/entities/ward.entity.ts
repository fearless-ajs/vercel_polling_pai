import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type WardDocument = HydratedDocument<Ward>;

@Schema()
export class Ward {
    @Prop({
        unique: true
    })
    id: string;

    @Prop()
    lga_id: string;

    @Prop({
        unique: true
    })
    name: string;
}


export const WardSchema = SchemaFactory.createForClass(Ward);


