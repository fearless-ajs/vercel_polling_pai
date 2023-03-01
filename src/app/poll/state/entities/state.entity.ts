import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";

export type StateDocument = HydratedDocument<State>;

@Schema()
export class State {
    @Prop({
        unique: true
    })
    id: string;

    @Prop({
        unique: true
    })
    name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);



