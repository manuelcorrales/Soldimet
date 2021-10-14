import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrecioRepuesto } from '../precio-repuesto.model';
import { PrecioRepuestoService } from '../service/precio-repuesto.service';
import { PrecioRepuestoDeleteDialogComponent } from '../delete/precio-repuesto-delete-dialog.component';

@Component({
  selector: 'jhi-precio-repuesto',
  templateUrl: './precio-repuesto.component.html',
})
export class PrecioRepuestoComponent implements OnInit {
  precioRepuestos?: IPrecioRepuesto[];
  isLoading = false;

  constructor(protected precioRepuestoService: PrecioRepuestoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.precioRepuestoService.query().subscribe(
      (res: HttpResponse<IPrecioRepuesto[]>) => {
        this.isLoading = false;
        this.precioRepuestos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPrecioRepuesto): number {
    return item.id!;
  }

  delete(precioRepuesto: IPrecioRepuesto): void {
    const modalRef = this.modalService.open(PrecioRepuestoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.precioRepuesto = precioRepuesto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
