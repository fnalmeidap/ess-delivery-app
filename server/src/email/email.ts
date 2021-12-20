import * as nodemailer from "nodemailer";

class Config {
    HOST = "smtp.gmail.com";
    PORT = 587;
    USER = "felipe.nunesalmeida@gmail.com";
    PASSWORD = "";
}

export class Mail {
  constructor(
      public to?: string,
      public subject?: string,
      public message?: string) { }


  async sendMail() {

    let config = new Config()

    const transporter = nodemailer.createTransport({
        host: config.HOST,
        port: config.PORT,
        secure: false,
        auth: {
            user: config.USER,
            pass: config.PASSWORD
        },
        tls: { rejectUnauthorized: false }
    });

    const answer = await transporter.sendMail({
      text: "Texto olaa",
      subject: "assunto do email",
      from: "Nome do enviador",
      to: ['rbnn@cin.ufpe.br']
    });
  }


}
