import { Payment } from "./payment";

export class PaymentService {
	paymentMethods: Payment[] = [];

	add(payment: Payment): Payment {
		let id = this.paymentMethods.length + 1;
		let newType = true;
    payment.id = id;

    this.paymentMethods.forEach(element => {
      if ( element.type == payment.type){
        newType = false;
      }
    })
    if (newType){
      this.paymentMethods.push(new Payment(payment));
    }
		return payment;
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

		console.log(payments);

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
