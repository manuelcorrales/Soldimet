import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoArticulo } from '../estado-articulo.model';
import { EstadoArticuloService } from '../service/estado-articulo.service';
import { EstadoArticuloDeleteDialogComponent } from '../delete/estado-articulo-delete-dialog.component';

@Component({
  selector: 'jhi-estado-articulo',
  templateUrl: './estado-articulo.component.html',
})
export class EstadoArticuloComponent implements OnInit {
  estadoArticulos?: IEstadoArticulo[];
  isLoading = false;

  constructor(protected estadoArticuloService: EstadoArticuloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoArticuloService.query().subscribe(
      (res: HttpResponse<IEstadoArticulo[]>) => {
        this.isLoading = false;
        this.estadoArticulos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoArticulo): number {
    return item.id!;
  }

  delete(estadoArticulo: IEstadoArticulo): void {
    const modalRef = this.modalService.open(EstadoArticuloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoArticulo = estadoArticulo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
