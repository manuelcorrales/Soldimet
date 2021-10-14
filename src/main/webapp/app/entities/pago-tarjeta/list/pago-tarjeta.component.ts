import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoTarjeta } from '../pago-tarjeta.model';
import { PagoTarjetaService } from '../service/pago-tarjeta.service';
import { PagoTarjetaDeleteDialogComponent } from '../delete/pago-tarjeta-delete-dialog.component';

@Component({
  selector: 'jhi-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
})
export class PagoTarjetaComponent implements OnInit {
  pagoTarjetas?: IPagoTarjeta[];
  isLoading = false;

  constructor(protected pagoTarjetaService: PagoTarjetaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pagoTarjetaService.query().subscribe(
      (res: HttpResponse<IPagoTarjeta[]>) => {
        this.isLoading = false;
        this.pagoTarjetas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPagoTarjeta): number {
    return item.id!;
  }

  delete(pagoTarjeta: IPagoTarjeta): void {
    const modalRef = this.modalService.open(PagoTarjetaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pagoTarjeta = pagoTarjeta;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
