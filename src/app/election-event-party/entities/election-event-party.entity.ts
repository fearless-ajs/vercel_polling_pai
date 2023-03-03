import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";
import {Party} from "@app/party/entities/party.entity";
import {ElectionEvent} from "@app/election-event/entities/election-event.entity";

export type ElectionEventPartyDocument = HydratedDocument<ElectionEventParty>;

@Schema()
export class ElectionEventParty {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Party' })
    party_id: Party

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ElectionEvent' })
    election_event_id: ElectionEvent

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

export const ElectionEventPartySchema = SchemaFactory.createForClass(ElectionEventParty);

