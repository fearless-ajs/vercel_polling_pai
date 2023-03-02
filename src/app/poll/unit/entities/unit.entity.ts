import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UnitDocument = HydratedDocument<Unit>;

@Schema()
export class Unit {
    @Prop({
        unique: true
    })
    id: string;

    @Prop()
    ward_id: string;

    @Prop({
        unique: true
    })
    name: string;
}


export const UNitSchema = SchemaFactory.createForClass(Unit);

