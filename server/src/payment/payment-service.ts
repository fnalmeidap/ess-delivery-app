import { Payment } from "./payment";

export class PaymentService {
	paymentMethods: Payment[] = [];

	add(payment: Payment): boolean {
		// field value must be one of the following:
		// "Dinheiro", "Mastercard", "Visa", "PayPal", "Google Pay", "Apple Pay", "Cielo", "PicPay", "Pix"

		let valid_values = [
			"Dinheiro",
			"Mastercard",
			"Visa",
			"PayPal",
			"Google Pay",
			"Apple Pay",
			"Cielo",
			"PicPay",
			"Pix",
		];

		let steps = { stepOne: false, stepTwo: false };

		if (valid_values.includes(payment.type)) {
			steps.stepOne = true;
		}

		if (payment.status === "Ativo" || payment.status === "Inativo") {
			steps.stepTwo = true;
		}

		if (steps.stepOne && steps.stepTwo) {
			payment.id = this.paymentMethods.length + 1;

			this.paymentMethods.push(new Payment(payment));
			return true;
		}

		return false;
	}

	update(payment: Payment): boolean {
		const toBeUpdated = this.getById(payment.id);

		try {
			toBeUpdated.update(payment);
		} catch (error) {
			return false;
		}

		return true;
	}

	deleteById(paymentId: number): void {
		let payments = this.paymentMethods.filter(
			(payment) => payment.id != paymentId
		);

		this.paymentMethods = payments;
	}

	deleteByName(paymentName: string): void {
		this.paymentMethods.filter((payment) => payment.value != paymentName);
	}

	get(): Payment[] {
		return this.paymentMethods;
	}

	getById(paymentId: number): Payment {
		return this.paymentMethods.find(({ id }) => id == paymentId);
	}
}
