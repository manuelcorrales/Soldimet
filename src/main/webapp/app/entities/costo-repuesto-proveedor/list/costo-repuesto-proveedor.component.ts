import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';
import { CostoRepuestoProveedorDeleteDialogComponent } from '../delete/costo-repuesto-proveedor-delete-dialog.component';

@Component({
  selector: 'jhi-costo-repuesto-proveedor',
  templateUrl: './costo-repuesto-proveedor.component.html',
})
export class CostoRepuestoProveedorComponent implements OnInit {
  costoRepuestoProveedors?: ICostoRepuestoProveedor[];
  isLoading = false;

  constructor(protected costoRepuestoProveedorService: CostoRepuestoProveedorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.costoRepuestoProveedorService.query().subscribe(
      (res: HttpResponse<ICostoRepuestoProveedor[]>) => {
        this.isLoading = false;
        this.costoRepuestoProveedors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICostoRepuestoProveedor): number {
    return item.id!;
  }

  delete(costoRepuestoProveedor: ICostoRepuestoProveedor): void {
    const modalRef = this.modalService.open(CostoRepuestoProveedorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.costoRepuestoProveedor = costoRepuestoProveedor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
