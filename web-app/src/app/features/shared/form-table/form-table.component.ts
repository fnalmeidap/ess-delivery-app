import { Promotion } from './../interfaces/promotion.interface';
import { Product } from './../interfaces/product.interface';
import { DataService } from './../../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableComponent implements OnInit {
  from_date?: string;
  status?: string;
  to_date?: string;
  productName?: string;

  types = ['Ativa', 'Inativa'];

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<FormTableComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * Callback for button click on form.
   * Request to the server to create a new promotion.
   */
  public onClick(): void {
    let data: Promotion = {
      name: String(this.productName),
      status: String(this.status),
      end: this.to_date ? new Date(this.to_date).toISOString() : '',
      start: this.from_date ? new Date(this.from_date).toISOString() : '',
    };

    this.dataService.updatePromotions(data);

    this.dialogRef.close();
  }
}
