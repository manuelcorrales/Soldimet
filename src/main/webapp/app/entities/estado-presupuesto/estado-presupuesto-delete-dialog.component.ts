import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Component({
  selector: 'jhi-estado-presupuesto-delete-dialog',
  templateUrl: './estado-presupuesto-delete-dialog.component.html'
})
export class EstadoPresupuestoDeleteDialogComponent {
  estadoPresupuesto: IEstadoPresupuesto;

  constructor(
    protected estadoPresupuestoService: EstadoPresupuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoPresupuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoPresupuestoListModification',
        content: 'Deleted an estadoPresupuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-presupuesto-delete-popup',
  template: ''
})
export class EstadoPresupuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoPresupuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoPresupuesto = estadoPresupuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-presupuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-presupuesto', { outlets: { popup: null } }]);
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
