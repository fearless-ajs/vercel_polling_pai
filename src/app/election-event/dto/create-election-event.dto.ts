import {IsEnum, IsInt, IsNotEmpty, IsString, Max, Min} from "class-validator";

export class CreateElectionEventDto {
    @IsNotEmpty() @IsString()
    title: string

    @IsNotEmpty() @IsEnum(
        [
            'general',
            'run-off',
            'supplementary',
            're-run'
        ],{
            message: 'type must either be general, run-off, supplementary, re-run'
        }
    )
    type: string;

    @IsNotEmpty() @IsInt()
    year: number;

    @IsNotEmpty() @IsInt() @Max(12)
    start_month: number;

    @IsNotEmpty() @IsInt()  @Max(31)
    start_day: number;

    @IsNotEmpty() @IsInt()  @Max(12)
    end_month: number;

    @IsNotEmpty() @IsInt()  @Max(31)
    end_day: number;


}
