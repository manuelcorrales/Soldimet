import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistorialPrecio } from '../historial-precio.model';
import { HistorialPrecioService } from '../service/historial-precio.service';
import { HistorialPrecioDeleteDialogComponent } from '../delete/historial-precio-delete-dialog.component';

@Component({
  selector: 'jhi-historial-precio',
  templateUrl: './historial-precio.component.html',
})
export class HistorialPrecioComponent implements OnInit {
  historialPrecios?: IHistorialPrecio[];
  isLoading = false;

  constructor(protected historialPrecioService: HistorialPrecioService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.historialPrecioService.query().subscribe(
      (res: HttpResponse<IHistorialPrecio[]>) => {
        this.isLoading = false;
        this.historialPrecios = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IHistorialPrecio): number {
    return item.id!;
  }

  delete(historialPrecio: IHistorialPrecio): void {
    const modalRef = this.modalService.open(HistorialPrecioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historialPrecio = historialPrecio;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
