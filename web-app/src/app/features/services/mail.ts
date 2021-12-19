import * as nodemailer from "nodemailer";
import {Configs} from './configs';

export class Mail {
    config = new Configs();
    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        let mailOptions = {
            from: "rbb@cin.ufpe.br",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            host: this.config.host,
            port: this.config.port,
            secure: false,
            auth: {
                user: this.config.user,
                pass: this.config.password
            },
            tls: { rejectUnauthorized: false }
        });


        console.log(mailOptions);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}