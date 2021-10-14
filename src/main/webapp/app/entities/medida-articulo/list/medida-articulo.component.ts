import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedidaArticulo } from '../medida-articulo.model';
import { MedidaArticuloService } from '../service/medida-articulo.service';
import { MedidaArticuloDeleteDialogComponent } from '../delete/medida-articulo-delete-dialog.component';

@Component({
  selector: 'jhi-medida-articulo',
  templateUrl: './medida-articulo.component.html',
})
export class MedidaArticuloComponent implements OnInit {
  medidaArticulos?: IMedidaArticulo[];
  isLoading = false;

  constructor(protected medidaArticuloService: MedidaArticuloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.medidaArticuloService.query().subscribe(
      (res: HttpResponse<IMedidaArticulo[]>) => {
        this.isLoading = false;
        this.medidaArticulos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  delete(medidaArticulo: IMedidaArticulo): void {
    const modalRef = this.modalService.open(MedidaArticuloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medidaArticulo = medidaArticulo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
