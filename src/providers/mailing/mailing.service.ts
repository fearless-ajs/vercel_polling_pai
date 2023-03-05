import { Injectable } from '@nestjs/common';
import MailCore from "@/helpers/mail-core";

@Injectable()
export class MailingService extends MailCore{

  async sendWelcomeMessage(to: string, from: string, subject: string, payload: any){
    await this.sendHtmlEmail(to, from, subject, 'welcome', payload);
  }

  async sendAccountVerificationMessage(to: string, from: string, subject: string, payload: any){
    await this.sendHtmlEmail(to, from, subject, 'account_verified', payload);
  }

  async sendForgotPasswordMessage(to: string, from: string, subject: string, payload: any){
    await this.sendHtmlEmail(to, from, subject, 'passwordReset', payload);
  }


  async sendPasswordUpdatedMessage(to: string, from: string, subject: string, payload: any){
    await this.sendHtmlEmail(to, from, subject, 'passwordUpdated', payload);
  }




}
