import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoriaPago } from '../categoria-pago.model';
import { CategoriaPagoService } from '../service/categoria-pago.service';
import { CategoriaPagoDeleteDialogComponent } from '../delete/categoria-pago-delete-dialog.component';

@Component({
  selector: 'jhi-categoria-pago',
  templateUrl: './categoria-pago.component.html',
})
export class CategoriaPagoComponent implements OnInit {
  categoriaPagos?: ICategoriaPago[];
  isLoading = false;

  constructor(protected categoriaPagoService: CategoriaPagoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.categoriaPagoService.query().subscribe(
      (res: HttpResponse<ICategoriaPago[]>) => {
        this.isLoading = false;
        this.categoriaPagos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICategoriaPago): number {
    return item.id!;
  }

  delete(categoriaPago: ICategoriaPago): void {
    const modalRef = this.modalService.open(CategoriaPagoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.categoriaPago = categoriaPago;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
