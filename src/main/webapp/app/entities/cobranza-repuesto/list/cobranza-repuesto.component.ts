import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICobranzaRepuesto } from '../cobranza-repuesto.model';
import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';
import { CobranzaRepuestoDeleteDialogComponent } from '../delete/cobranza-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-cobranza-repuesto',
  templateUrl: './cobranza-repuesto.component.html',
})
export class CobranzaRepuestoComponent implements OnInit {
  cobranzaRepuestos?: ICobranzaRepuesto[];
  isLoading = false;

  constructor(protected cobranzaRepuestoService: CobranzaRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cobranzaRepuestoService.query().subscribe(
      (res: HttpResponse<ICobranzaRepuesto[]>) => {
        this.isLoading = false;
        this.cobranzaRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICobranzaRepuesto): number {
    return item.id!;
  }

  delete(cobranzaRepuesto: ICobranzaRepuesto): void {
    const modalRef = this.modalService.open(CobranzaRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cobranzaRepuesto = cobranzaRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
