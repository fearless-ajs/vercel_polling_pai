import {Body, Controller, Get, Post, Request, Res, UseGuards} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {Response} from "express";
import {VerifyTokenDto} from "./dto/verify-token.dto";
import ApiResponse from "../../helpers/api_response";
import {ResendTokenDto} from "./dto/resed-token.dto";
import {RegisterDto} from "./dto/register.dto";
import {AuthGuard} from "@nestjs/passport";
import {AccountInfoDto} from "./dto/account-info.dto";
import {ForgotPasswordDto} from "@app/auth/dto/forgot-password.dto";
import {ResetPasswordTokenDto} from "@app/auth/dto/reset-password-token.dto";

@Controller('auth')
export class AuthenticationController extends ApiResponse{
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }


  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any, @Res() res: Response) {
    const auth_token = await this.authenticationService.login(req.user);
    const { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt } = req.user;
    return this.successMessageWithData({
      access_token: auth_token,
      user: {
        _id,
        fullname: name,
        email,
        username,
        mobile_number,
        country,
        image,
        verificationStatus,
        createdAt,
        updatedAt,
      }
    }, 202, res);
  }


  @Post('verify-token')
  async verifyToken(@Body() verifyTokenDto: VerifyTokenDto, @Res() res: Response) {
      const response_data = await this.authenticationService.verifyToken(verifyTokenDto.token);
      // @ts-ignore
    const { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt } = response_data;
      return this.successMessageWithData( { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt }, 200, res);
  }

  @Post('resend-token')
  async resendToken(@Body() resendTokenDto: ResendTokenDto, @Res() res: Response) {
    await this.authenticationService.resendToken(resendTokenDto.email);
    return this.successMessage('Token resent.', 200, res);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Res() res: Response) {
    await this.authenticationService.forgotPassword(forgotPasswordDto.email);
    return this.successMessage('Reset Token resent.', 200, res);
  }


  @Post('reset-password')
  async resetPassword(@Body() resetPasswordTokenDto: ResetPasswordTokenDto, @Res() res: Response) {
    await this.authenticationService.resetPassword(resetPasswordTokenDto);
    return this.successMessage('Password reset successfully.', 200, res);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const response_data = await this.authenticationService.register(registerDto);
    // @ts-ignore
    const { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt } = response_data;

    return this.successMessageWithData({
      _id,
      fullname: name,
      email,
      username,
      mobile_number,
      country,
      image,
      createdAt,
      updatedAt,
      verificationStatus: verificationStatus
    }, 201, res);

  }



}
