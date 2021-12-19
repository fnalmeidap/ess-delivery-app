import * as nodemailer from "nodemailer";

enum Config {
    HOST = "",
    PORT = 587,
    USER = "",
    PASSWORD = ""
}

export class Mail {
    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        let mailOptions = {
            from: "portalband@band.com.br",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            host: Config.HOST,
            port: Config.PORT,
            secure: false,
            auth: {
                user: Config.USER,
                pass: Config.PASSWORD
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