import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ElectionEventFeed} from "@app/election-event-feed/entities/election-event-feed.entity";
import {Exclude} from "class-transformer";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        required: true,
        unique: true
    })
    username: string;

    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string

    @Prop()
    country: string

    @Prop()
    mobile_number: string

    @Prop()
    image: string


    @Prop({
        select: false
    })
    @Exclude()
    password: string;

    @Prop()
    passwordChangedAt: Date;

    @Prop()
    passwordResetToken: String;

    @Prop({
        select: false
    })
    verificationToken: string

    @Prop()
    verifiedAt: Date

    @Prop({
        default: false
    })
    verificationStatus: boolean

    @Prop()
    passwordResetExpires: Date;

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


export const UserSchema = SchemaFactory.createForClass(User);
