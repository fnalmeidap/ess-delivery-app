import { Payment } from "./payment";

export class PaymentService {
	paymentMethods: Payment[] = [];

	/**
	 * Adds a new payment method to the list of payment methods
	 * @param payment Payment method to be added
	 * @returns 'true' for success, 'false' for failure
	 */
	add(payment: Payment): boolean {
		let newType = true;

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

		if (payment.status === "Ativa" || payment.status === "Inativa") {
			steps.stepTwo = true;
		}

		if (steps.stepOne && steps.stepTwo) {
			payment.id = this.paymentMethods.length;

			this.paymentMethods.forEach((element) => {
				if (element.type == payment.type) {
					newType = false;
				}
			});

			if (newType) {
				this.paymentMethods.push(new Payment(payment));
			}

			return true;
		}

		return false;
	}

	/**
	 * Update a payment method searching on list by id
	 * @param payment Payment method to be updated
	 * @returns 'true' for success, 'false' for failure
	 */
	update(payment: Payment): boolean {
		const toBeUpdated = this.getById(payment.id);

		try {
			toBeUpdated.update(payment);
		} catch (error) {
			return false;
		}

		return true;
	}

	/**
	 * Deletes a payment method on list by id
	 * @param paymentId Payment id to be searched and deleted
	 */
	deleteById(paymentId: number): void {
		let payments = this.paymentMethods.filter(
			(payment) => payment.id != paymentId
		);

		this.paymentMethods = payments;
	}

	/**
	 * Deletes a payment method on list by name
	 * @param paymentName Payment name to be searched and deleted
	 */
	deleteByName(paymentName: string): void {
		this.paymentMethods.filter((payment) => payment.value != paymentName);
	}

	/**
	 * Getter for payment methods list
	 * @returns All payment methods
	 */
	get(): Payment[] {
		return this.paymentMethods;
	}

	/**
	 * Search for a payment method on list by id
	 * @param paymentId Payment id to be searched
	 * @returns Payment method by id
	 */
	getById(paymentId: number): Payment {
		return this.paymentMethods.find(({ id }) => id == paymentId);
	}
}
