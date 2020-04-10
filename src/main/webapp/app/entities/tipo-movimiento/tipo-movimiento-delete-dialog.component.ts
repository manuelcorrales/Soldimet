import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';

@Component({
  selector: 'jhi-tipo-movimiento-delete-dialog',
  templateUrl: './tipo-movimiento-delete-dialog.component.html'
})
export class TipoMovimientoDeleteDialogComponent {
  tipoMovimiento: ITipoMovimiento;

  constructor(
    protected tipoMovimientoService: TipoMovimientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoMovimientoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoMovimientoListModification',
        content: 'Deleted an tipoMovimiento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-movimiento-delete-popup',
  template: ''
})
export class TipoMovimientoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoMovimientoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoMovimiento = tipoMovimiento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-movimiento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-movimiento', { outlets: { popup: null } }]);
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
