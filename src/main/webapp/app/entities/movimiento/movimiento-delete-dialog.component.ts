import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';

@Component({
  selector: 'jhi-movimiento-delete-dialog',
  templateUrl: './movimiento-delete-dialog.component.html'
})
export class MovimientoDeleteDialogComponent {
  movimiento: IMovimiento;

  constructor(
    protected movimientoService: MovimientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.movimientoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'movimientoListModification',
        content: 'Deleted an movimiento'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-movimiento-delete-popup',
  template: ''
})
export class MovimientoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ movimiento }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MovimientoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.movimiento = movimiento;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/movimiento', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/movimiento', { outlets: { popup: null } }]);
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
