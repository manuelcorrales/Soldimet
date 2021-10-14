import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';
import { MedioDePagoTarjetaDeleteDialogComponent } from '../delete/medio-de-pago-tarjeta-delete-dialog.component';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta',
  templateUrl: './medio-de-pago-tarjeta.component.html',
})
export class MedioDePagoTarjetaComponent implements OnInit {
  medioDePagoTarjetas?: IMedioDePagoTarjeta[];
  isLoading = false;

  constructor(protected medioDePagoTarjetaService: MedioDePagoTarjetaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.medioDePagoTarjetaService.query().subscribe(
      (res: HttpResponse<IMedioDePagoTarjeta[]>) => {
        this.isLoading = false;
        this.medioDePagoTarjetas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMedioDePagoTarjeta): number {
    return item.id!;
  }

  delete(medioDePagoTarjeta: IMedioDePagoTarjeta): void {
    const modalRef = this.modalService.open(MedioDePagoTarjetaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medioDePagoTarjeta = medioDePagoTarjeta;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
