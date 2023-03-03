import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ElectionEventDocument = HydratedDocument<ElectionEvent>;

@Schema()
export class ElectionEvent {
  @Prop()
  title: string;

  @Prop()
  type: string;

    @Prop({
        type: Number
    })
    year: number;

    @Prop({
        type: Number
    })
    start_month: number;

    @Prop({
        type: Number
    })
    start_day: number;

    @Prop({
        type: Number
    })
    end_month: number;

    @Prop({
        type: Number
    })
    end_day: number;


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

export const ElectionEventSchema = SchemaFactory.createForClass(ElectionEvent);
