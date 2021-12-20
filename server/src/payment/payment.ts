export class Payment {
	id: number;
	type:
		| "Dinheiro"
		| "Mastercard"
		| "Visa"
		| "PayPal"
		| "Google Pay"
		| "Apple Pay"
		| "Cielo"
		| "PicPay"
		| "Pix";
	status: "Ativo" | "Inativo";
	value: string;

	constructor(payment: Payment) {
		this.id = payment.id;
		this.type = payment.type;
		this.value = payment.value;
		this.status = payment.status;
	}

	update(payment: Payment): void {
		this.type = payment.type;
		this.value = payment.value;
		this.status = payment.status;
	}
}
