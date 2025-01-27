import { Payment } from './../interfaces/payment.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss'],
})
export class PaymentTableComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Payment> | undefined;
  displayedColumns: string[] = ['Tipo', 'Status', 'Ações'];
  data$: Observable<Payment[]> | undefined;
  dataSource: MatTableDataSource<any>;
  loading: boolean = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.payments$;

    /**
     * Subscribe to receive data from the promotion subject.
     * When data is received or updated, update the table.
     */
    this.data$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.loading = false;
      this.table?.renderRows();
    });
  }

  /**
   * Callback to create a delete request.
   * @param element Element to be deleted
   */
  onDelete(element: Payment) {
    this.dataService.deletePayment(element).subscribe((res) => {
      if (res.status == 203) {
        this.dataService.getPayments();
      }
    });
  }
}
