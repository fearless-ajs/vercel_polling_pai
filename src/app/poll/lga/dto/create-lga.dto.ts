import {IsNotEmpty, IsString} from "class-validator";

export class CreateLgaDto {
    @IsNotEmpty() @IsString()
    name: string

    @IsNotEmpty() @IsString()
    state_id: string
}
