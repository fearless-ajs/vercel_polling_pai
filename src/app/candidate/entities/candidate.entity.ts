import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";
import {Party} from "@app/party/entities/party.entity";
import {ElectionEvent} from "@app/election-event/entities/election-event.entity";

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Candidate {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Party' })
    party_id: Party

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ElectionEvent' })
    election_event_id: ElectionEvent

    @Prop({
        maxlength: 500
    })
    name: string;

    @Prop({
        maxLength: 500
    })
    image: string;

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

export const CandidateSchema = SchemaFactory.createForClass(Candidate);


