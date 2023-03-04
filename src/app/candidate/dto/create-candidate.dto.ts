import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateCandidateDto {
    @IsNotEmpty() @IsString()
    name: string

    @IsNotEmpty() @IsString()
    party_id: string

    @IsNotEmpty() @IsString()
    election_event_id: string

    @IsOptional()
    image: any

}
