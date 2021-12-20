import { Payment } from './../shared/interfaces/payment.interface';
import { Promotion } from '../shared/interfaces/promotion.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * Subjects are for spread information for all subscribed components.
   */

  private promotionSubject = new BehaviorSubject<any>([]);
  private paymentSubject = new BehaviorSubject<any>([]);

  private promotionLoadingSubject = new BehaviorSubject<boolean>(true);
  private paymentLoadingSubject = new BehaviorSubject<boolean>(true);

  BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  /**
   * Get all promotions from the server.
   */
  public getPromotions() {
    this.promotionLoadingSubject.next(true);

    this.http
      .get<Promotion[]>(this.BASE_URL + 'promotions')
      .subscribe((promotions) => {
        this.promotionSubject.next(promotions);
        this.promotionLoadingSubject.next(false);
      });
  }

  /**
   * Get all payments from the server.
   */
  public getPayments() {
    this.paymentLoadingSubject.next(true);

    // We've made the subscribe here because we need to wait for the data to be loaded.
    // After that, we spread the information to all subscribed components.

    this.http
      .get<Payment[]>(this.BASE_URL + 'payments')
      .subscribe((payments) => {
        this.paymentSubject.next(payments);
        this.paymentLoadingSubject.next(false);
      });
  }

  /**
   * Function to send the email for users.
   * @param email Address that will receive the email.
   */
  public sendEmail(email: string) {
    this.http.post(this.BASE_URL + 'email', { email }).subscribe();
  }

  /**
   * Function to get the promotions list as observable.
   * @readonly
   */
  get promotions$() {
    return this.promotionSubject.asObservable();
  }

  /**
   * Function to get the payments list as observable.
   * @readonly
   */
  get payments$() {
    return this.paymentSubject.asObservable();
  }

  /**
   * We use loading as observable so that way we can use pipe async on the template.
   */
  get loadingPromotions$() {
    return this.promotionLoadingSubject.asObservable();
  }
  get loadingPayments$() {
    return this.paymentLoadingSubject.asObservable();
  }

  /**
   * Creates the requisition to add payment.
   * @param data data to be sent to the server
   */
  public updatePayments(data: Payment) {
    this.http
      .post(this.BASE_URL + 'payments', data)
      .subscribe()
      .add(() => {
        this.getPayments();
      });
  }

  /**
   * Creates the requisition to add promotion.
   * @param data data to be sent to the server
   */
  public updatePromotions(data: Promotion) {
    this.http
      .post(this.BASE_URL + 'promotions', data)
      .subscribe()
      .add(() => {
        this.getPromotions();
      });
  }

  /**
   * Creates the requisition to delete promotion.
   * @param promotion Promotion that will be deleted
   * @returns Observable for the delete request
   */
  public deletePromotion(promotion: Promotion) {
    return this.http.delete<{ status: number; message?: string }>(
      this.BASE_URL + `promotions/${promotion.id}`
    );
  }

  /**
   * Creates the requisition to delete payment.
   * @param payment Payment that will be deleted
   * @returns Observable for the delete request
   */
  public deletePayment(payment: Payment) {
    return this.http.delete<{ status: number; message?: string }>(
      this.BASE_URL + `payments/${payment.id}`
    );
  }
}
