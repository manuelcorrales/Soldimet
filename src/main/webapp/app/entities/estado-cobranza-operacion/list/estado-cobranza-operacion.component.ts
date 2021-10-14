import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';
import { EstadoCobranzaOperacionDeleteDialogComponent } from '../delete/estado-cobranza-operacion-delete-dialog.component';

@Component({
  selector: 'jhi-estado-cobranza-operacion',
  templateUrl: './estado-cobranza-operacion.component.html',
})
export class EstadoCobranzaOperacionComponent implements OnInit {
  estadoCobranzaOperacions?: IEstadoCobranzaOperacion[];
  isLoading = false;

  constructor(protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoCobranzaOperacionService.query().subscribe(
      (res: HttpResponse<IEstadoCobranzaOperacion[]>) => {
        this.isLoading = false;
        this.estadoCobranzaOperacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoCobranzaOperacion): number {
    return item.id!;
  }

  delete(estadoCobranzaOperacion: IEstadoCobranzaOperacion): void {
    const modalRef = this.modalService.open(EstadoCobranzaOperacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoCobranzaOperacion = estadoCobranzaOperacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
