import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoEfectivo } from '../pago-efectivo.model';
import { PagoEfectivoService } from '../service/pago-efectivo.service';
import { PagoEfectivoDeleteDialogComponent } from '../delete/pago-efectivo-delete-dialog.component';

@Component({
  selector: 'jhi-pago-efectivo',
  templateUrl: './pago-efectivo.component.html',
})
export class PagoEfectivoComponent implements OnInit {
  pagoEfectivos?: IPagoEfectivo[];
  isLoading = false;

  constructor(protected pagoEfectivoService: PagoEfectivoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pagoEfectivoService.query().subscribe(
      (res: HttpResponse<IPagoEfectivo[]>) => {
        this.isLoading = false;
        this.pagoEfectivos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPagoEfectivo): number {
    return item.id!;
  }

  delete(pagoEfectivo: IPagoEfectivo): void {
    const modalRef = this.modalService.open(PagoEfectivoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pagoEfectivo = pagoEfectivo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
