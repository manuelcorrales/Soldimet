import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from './estado-movimiento.service';

@Component({
  selector: 'jhi-estado-movimiento-delete-dialog',
  templateUrl: './estado-movimiento-delete-dialog.component.html'
})
export class EstadoMovimientoDeleteDialogComponent {
  estadoMovimiento: IEstadoMovimiento;

  constructor(
    protected estadoMovimientoService: EstadoMovimientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoMovimientoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoMovimientoListModification',
        content: 'Deleted an estadoMovimiento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-movimiento-delete-popup',
  template: ''
})
export class EstadoMovimientoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoMovimientoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoMovimiento = estadoMovimiento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-movimiento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-movimiento', { outlets: { popup: null } }]);
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
