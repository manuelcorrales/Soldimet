import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoArticulo } from '../movimiento-articulo.model';
import { MovimientoArticuloService } from '../service/movimiento-articulo.service';
import { MovimientoArticuloDeleteDialogComponent } from '../delete/movimiento-articulo-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento-articulo',
  templateUrl: './movimiento-articulo.component.html',
})
export class MovimientoArticuloComponent implements OnInit {
  movimientoArticulos?: IMovimientoArticulo[];
  isLoading = false;

  constructor(protected movimientoArticuloService: MovimientoArticuloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movimientoArticuloService.query().subscribe(
      (res: HttpResponse<IMovimientoArticulo[]>) => {
        this.isLoading = false;
        this.movimientoArticulos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMovimientoArticulo): number {
    return item.id!;
  }

  delete(movimientoArticulo: IMovimientoArticulo): void {
    const modalRef = this.modalService.open(MovimientoArticuloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientoArticulo = movimientoArticulo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
