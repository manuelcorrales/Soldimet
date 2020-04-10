import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

@Component({
  selector: 'jhi-tipo-detalle-movimiento-delete-dialog',
  templateUrl: './tipo-detalle-movimiento-delete-dialog.component.html'
})
export class TipoDetalleMovimientoDeleteDialogComponent {
  tipoDetalleMovimiento: ITipoDetalleMovimiento;

  constructor(
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoDetalleMovimientoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoDetalleMovimientoListModification',
        content: 'Deleted an tipoDetalleMovimiento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-detalle-movimiento-delete-popup',
  template: ''
})
export class TipoDetalleMovimientoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoDetalleMovimiento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoDetalleMovimientoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.tipoDetalleMovimiento = tipoDetalleMovimiento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-detalle-movimiento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-detalle-movimiento', { outlets: { popup: null } }]);
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
