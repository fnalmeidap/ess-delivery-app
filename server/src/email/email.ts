import * as nodemailer from "nodemailer";

class Config {
	HOST = "smtp.gmail.com";
	PORT = 587;
	USER = "";
	PASSWORD = "";
}

export class Mail {
	constructor(
		public to?: string,
		public subject?: string,
		public message?: string
	) {}

	async sendMail() {
		let config = new Config();

		const transporter = nodemailer.createTransport({
			host: config.HOST,
			port: config.PORT,
			secure: false,
			auth: {
				user: config.USER,
				pass: config.PASSWORD,
			},
			tls: { rejectUnauthorized: false },
		});

		const answer = await transporter.sendMail({
			text: "Texto olaa",
			subject: "assunto do email",
			from: "Nome do enviador",
			to: this.to,
      html:`
        <html>
          <body>
            <strong>Pedido:</strong> 43JK2AS7HF
            <strong>Nome:</strong> Cliente da Silva
            <strong>Endereço:</strong> Endereço do cliente
            <br>
            <strong>Valor da compra:</strong> R$ 10,00
            <strong>Itens:</strong> Açaí com banana, Milk Shake
          </body>
        </html>
      `
		});
	}
}