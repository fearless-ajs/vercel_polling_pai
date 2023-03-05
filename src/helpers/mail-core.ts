import {MailerService} from "@nestjs-modules/mailer";
import {Injectable} from "@nestjs/common";

@Injectable()
class MailCore {
    constructor(private mailerService: MailerService) {}

    async sendPlainTextEmail(to: string, from: string, subject: string, text: string): Promise<boolean> {
        await this.mailerService.sendMail({
            to: to,
            from: from,
            subject: subject,
            text: text
        }).then(res =>{
            // Do something in the future

        }).catch(err =>{
            // Log the error
            console.log(err)
        })
        return true;
    }


    async sendHtmlEmail(to: string, from: string, subject: string, template: string, payload: any){
        await this.mailerService.sendMail({
            to,
            from,
            subject,
            template,
            context: {
                payload: payload
            }
        }).then(res =>{
            // Do something in the future

        }).catch(err =>{
            // Log the error
            console.log(err)
        })
        return true;
    }

}

export default MailCore;