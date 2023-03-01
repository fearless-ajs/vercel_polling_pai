import { IsNotEmpty, IsString} from "class-validator";

export class CreateStateDto {
    @IsNotEmpty() @IsString()
    name: string
}
