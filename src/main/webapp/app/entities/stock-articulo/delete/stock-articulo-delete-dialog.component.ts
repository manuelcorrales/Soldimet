import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockArticulo } from '../stock-articulo.model';
import { StockArticuloService } from '../service/stock-articulo.service';

@Component({
  templateUrl: './stock-articulo-delete-dialog.component.html',
})
export class StockArticuloDeleteDialogComponent {
  stockArticulo?: IStockArticulo;

  constructor(protected stockArticuloService: StockArticuloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockArticuloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
