import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoRepuesto } from '../tipo-repuesto.model';
import { TipoRepuestoService } from '../service/tipo-repuesto.service';
import { TipoRepuestoDeleteDialogComponent } from '../delete/tipo-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-repuesto',
  templateUrl: './tipo-repuesto.component.html',
})
export class TipoRepuestoComponent implements OnInit {
  tipoRepuestos?: ITipoRepuesto[];
  isLoading = false;

  constructor(protected tipoRepuestoService: TipoRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tipoRepuestoService.query().subscribe(
      (res: HttpResponse<ITipoRepuesto[]>) => {
        this.isLoading = false;
        this.tipoRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITipoRepuesto): number {
    return item.id!;
  }

  delete(tipoRepuesto: ITipoRepuesto): void {
    const modalRef = this.modalService.open(TipoRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoRepuesto = tipoRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
