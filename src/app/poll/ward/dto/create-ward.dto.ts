import {IsNotEmpty, IsString} from "class-validator";

export class CreateWardDto {
    @IsNotEmpty() @IsString()
    name: string

    @IsNotEmpty() @IsString()
    lga_id: string
}
