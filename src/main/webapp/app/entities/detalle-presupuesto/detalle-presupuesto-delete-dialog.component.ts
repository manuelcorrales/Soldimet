import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';

@Component({
  selector: 'jhi-detalle-presupuesto-delete-dialog',
  templateUrl: './detalle-presupuesto-delete-dialog.component.html'
})
export class DetallePresupuestoDeleteDialogComponent {
  detallePresupuesto: IDetallePresupuesto;

  constructor(
    protected detallePresupuestoService: DetallePresupuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.detallePresupuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'detallePresupuestoListModification',
        content: 'Deleted an detallePresupuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-detalle-presupuesto-delete-popup',
  template: ''
})
export class DetallePresupuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DetallePresupuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.detallePresupuesto = detallePresupuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/detalle-presupuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/detalle-presupuesto', { outlets: { popup: null } }]);
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
