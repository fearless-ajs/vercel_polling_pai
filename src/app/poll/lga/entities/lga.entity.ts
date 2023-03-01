import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type LgaDocument = HydratedDocument<Lga>;

@Schema()
export class Lga {
    @Prop({
        unique: true
    })
    id: string;

    @Prop()
    state_id: string;

    @Prop({
        unique: true
    })
    name: string;
}


export const LgaSchema = SchemaFactory.createForClass(Lga);

