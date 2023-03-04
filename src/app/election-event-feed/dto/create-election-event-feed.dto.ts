import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateElectionEventFeedDto {
    @IsOptional()
    image: any

    // @IsOptional()
    // video: any

    @IsOptional()
    comment: string

    @IsNotEmpty() @IsString()
    election_event_id: string

    @IsNotEmpty() @IsString()
    state_id: string

    @IsNotEmpty() @IsString()
    lga_id: string

    @IsNotEmpty() @IsString()
    unit_id: string

    @IsNotEmpty() @IsString()
    user_id: string
}
