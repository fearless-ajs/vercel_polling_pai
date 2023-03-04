import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "@app/user/entities/user.entity";
import {ElectionEvent} from "@app/election-event/entities/election-event.entity";
import {State} from "@app/poll/state/entities/state.entity";
import {Lga} from "@app/poll/lga/entities/lga.entity";
import {Unit} from "@app/poll/unit/entities/unit.entity";

export type ElectionEventFeedDocument = HydratedDocument<ElectionEventFeed>;

@Schema()
export class ElectionEventFeed {
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ElectionEvent' })
    election_event_id: ElectionEvent

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State' })
    state_id: State

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lga' })
    lga_id: Lga

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' })
    unit_id: Unit

    @Prop({
        maxLength: 500
    })
    image: string;

    @Prop({
        maxLength: 500
    })
    comment: string;

    // @Prop({
    //     maxLength: 500
    // })
    // video: string;

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

export const ElectionEVentFeedSchema = SchemaFactory.createForClass(ElectionEventFeed);
