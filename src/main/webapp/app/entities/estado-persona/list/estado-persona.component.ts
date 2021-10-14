import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPersona } from '../estado-persona.model';
import { EstadoPersonaService } from '../service/estado-persona.service';
import { EstadoPersonaDeleteDialogComponent } from '../delete/estado-persona-delete-dialog.component';

@Component({
  selector: 'jhi-estado-persona',
  templateUrl: './estado-persona.component.html',
})
export class EstadoPersonaComponent implements OnInit {
  estadoPersonas?: IEstadoPersona[];
  isLoading = false;

  constructor(protected estadoPersonaService: EstadoPersonaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.estadoPersonaService.query().subscribe(
      (res: HttpResponse<IEstadoPersona[]>) => {
        this.isLoading = false;
        this.estadoPersonas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEstadoPersona): number {
    return item.id!;
  }

  delete(estadoPersona: IEstadoPersona): void {
    const modalRef = this.modalService.open(EstadoPersonaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estadoPersona = estadoPersona;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
