import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoOperacion } from '../estado-operacion.model';
import { EstadoOperacionService } from '../service/estado-operacion.service';
import { EstadoOperacionDeleteDialogComponent } from '../delete/estado-operacion-delete-dialog.component';

@Component({
  selector: 'jhi-estado-operacion',
  templateUrl: './estado-operacion.component.html',
})
export class EstadoOperacionComponent implements OnInit {
  estadoOperacions?: IEstadoOperacion[];
  isLoading = false;

  constructor(protected estadoOperacionService: EstadoOperacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoOperacionService.query().subscribe(
      (res: HttpResponse<IEstadoOperacion[]>) => {
        this.isLoading = false;
        this.estadoOperacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoOperacion): number {
    return item.id!;
  }

  delete(estadoOperacion: IEstadoOperacion): void {
    const modalRef = this.modalService.open(EstadoOperacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoOperacion = estadoOperacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
