import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePago } from '../medio-de-pago.model';
import { MedioDePagoService } from '../service/medio-de-pago.service';
import { MedioDePagoDeleteDialogComponent } from '../delete/medio-de-pago-delete-dialog.component';

@Component({
  selector: 'jhi-medio-de-pago',
  templateUrl: './medio-de-pago.component.html',
})
export class MedioDePagoComponent implements OnInit {
  medioDePagos?: IMedioDePago[];
  isLoading = false;

  constructor(protected medioDePagoService: MedioDePagoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.medioDePagoService.query().subscribe(
      (res: HttpResponse<IMedioDePago[]>) => {
        this.isLoading = false;
        this.medioDePagos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMedioDePago): number {
    return item.id!;
  }

  delete(medioDePago: IMedioDePago): void {
    const modalRef = this.modalService.open(MedioDePagoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medioDePago = medioDePago;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
