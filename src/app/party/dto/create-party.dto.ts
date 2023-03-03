import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreatePartyDto {
    @IsNotEmpty() @IsString()
    name: string

    @IsNotEmpty() @IsString()
    acronym: string

    @IsOptional()
    logo: any

    @IsNotEmpty() @IsString()
    chairman: string
}
