import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';


export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}


export class RegisterDto {
    @IsNotEmpty() @IsString()  @MaxLength(100)
    username: string

    @IsNotEmpty() @IsString() @MaxLength(100)
    name: string

    @IsNotEmpty() @IsEmail()  @MaxLength(100)
    email: string

    @IsNotEmpty() @IsString()  @MaxLength(100)
    country: string;

    @IsNotEmpty() @IsMobilePhone()  @MaxLength(100)
    mobile_number: string;

    @IsOptional()  @MaxLength(100)
    image: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsNotEmpty() @IsString()  @MaxLength(100)
    @Match('password', {
        message: "Password must match"
    })
    password_confirmation: string;
}