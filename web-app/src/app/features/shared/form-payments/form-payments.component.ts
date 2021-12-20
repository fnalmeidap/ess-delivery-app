import { Product } from './../interfaces/product.interface';
import { DataService } from './../../services/data.service';
import { Payment, types } from '../interfaces/payment.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-payments',
  templateUrl: './form-payments.component.html',
  styleUrls: ['./form-payments.component.scss'],
})
export class FormPaymentsComponent implements OnInit {
  value?: string;
  status?: string;

  types = [
    'Dinheiro',
    'Mastercard',
    'Visa',
    'PayPal',
    'Google Pay',
    'Apple Pay',
    'Cielo',
    'PicPay',
    'Pix',
  ];

  statusTypes = ['Ativa', 'Inativa'];

  type: string = 'CASH';

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<FormPaymentsComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * Callback for button click on form.
   * Request to the server to create a new payment.
   */
  public onClick(): void {
    let data: Payment = {
      value: String(this.value),
      type: this.type,
      status: String(this.status),
    };

    this.dataService.updatePayments(data);

    this.dialogRef.close();
  }
}
