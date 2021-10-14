import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoRepuesto } from '../costo-repuesto.model';
import { CostoRepuestoService } from '../service/costo-repuesto.service';
import { CostoRepuestoDeleteDialogComponent } from '../delete/costo-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-costo-repuesto',
  templateUrl: './costo-repuesto.component.html',
})
export class CostoRepuestoComponent implements OnInit {
  costoRepuestos?: ICostoRepuesto[];
  isLoading = false;

  constructor(protected costoRepuestoService: CostoRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.costoRepuestoService.query().subscribe(
      (res: HttpResponse<ICostoRepuesto[]>) => {
        this.isLoading = false;
        this.costoRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICostoRepuesto): number {
    return item.id!;
  }

  delete(costoRepuesto: ICostoRepuesto): void {
    const modalRef = this.modalService.open(CostoRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.costoRepuesto = costoRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
