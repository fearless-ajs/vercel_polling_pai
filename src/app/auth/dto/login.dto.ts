import {IsEmail, IsMobilePhone, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength} from 'class-validator';
export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone()
    phone: string

    @IsNumberString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    pin: string
}