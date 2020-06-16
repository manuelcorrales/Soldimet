import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from './costo-repuesto-proveedor.service';

@Component({
  selector: 'jhi-costo-repuesto-proveedor-delete-dialog',
  templateUrl: './costo-repuesto-proveedor-delete-dialog.component.html'
})
export class CostoRepuestoProveedorDeleteDialogComponent {
  costoRepuestoProveedor: ICostoRepuestoProveedor;

  constructor(
    protected costoRepuestoProveedorService: CostoRepuestoProveedorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.costoRepuestoProveedorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'costoRepuestoProveedorListModification',
        content: 'Deleted an costoRepuestoProveedor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-costo-repuesto-proveedor-delete-popup',
  template: ''
})
export class CostoRepuestoProveedorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costoRepuestoProveedor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CostoRepuestoProveedorDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.costoRepuestoProveedor = costoRepuestoProveedor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/costo-repuesto-proveedor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/costo-repuesto-proveedor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
