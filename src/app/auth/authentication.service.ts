import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../user/entities/user.entity";
import mongoose from "mongoose";
import {RegisterDto} from "./dto/register.dto";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);
    constructor(
        private readonly httpService: HttpService,
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string) {

        // Try to find the user with the account information
        const user = await this.userService.findOneByUsername(username)

        if (!user){
            return null;
        }

        // Try and verify user pin
       if (!await bcrypt.compare(password, user.password)){
           return null;
       }

        // Check if the account has been verified
        if (!user.verificationStatus){
            throw new HttpException('Unverified account', HttpStatus.UNAUTHORIZED);
        }

        // Check if the account is active
        // if (!user.active){
        //     throw new HttpException('Inactive account', HttpStatus.UNAUTHORIZED);
        // }

        return user;

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return this.jwtService.sign(payload)
    }

    async register(registerDto: RegisterDto): Promise<any> {
        // send token and account name to user

        return await this.userService.create(registerDto);
    }

    async resendToken(email: string): Promise<Boolean> {

        // Verify the token supplied
        const user = await this.userService.findOneByEmail(email);
        if (!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (user.verificationStatus){
            throw new HttpException('User verified already', HttpStatus.NOT_ACCEPTABLE);
        }

        // Send the token to the user email
        //
        // .
        return true;
    }


    async verifyToken(token: string): Promise<User> {
        // Verify the token supplied
        const user = await this.userService.checkUserVerificationToken(token);

        if (!user){
            throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
        }


        // Create a user for the tenant.

        // @ts-ignore
        return await this.userService.findOneByIdAndUpdate(user._id, {
            verificationStatus: true,
            verificationToken: null,
            verifiedAt: Date.now(),
            updatedAt: Date.now()
        });

    }



}
