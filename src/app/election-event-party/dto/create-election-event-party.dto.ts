import {IsNotEmpty, IsString, Max, MaxLength} from "class-validator";

export class CreateElectionEventPartyDto {
    @IsNotEmpty() @IsString() @MaxLength(100)
    party_id: string

    @IsNotEmpty() @IsString() @MaxLength(100)
    election_event_id: string
}
