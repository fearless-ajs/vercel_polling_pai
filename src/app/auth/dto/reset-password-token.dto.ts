import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {Match} from "@app/user/dto/create-user.dto";
export class ResetPasswordTokenDto {
    @IsNotEmpty() @IsNumberString()
    token: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    new_password: string;

    @IsNotEmpty() @IsString()  @MaxLength(100)
    @Match('new_password', {
        message: "Password must match"
    })
    password_confirmation: string;
}