import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';

@Component({
  selector: 'jhi-historial-precio-delete-dialog',
  templateUrl: './historial-precio-delete-dialog.component.html'
})
export class HistorialPrecioDeleteDialogComponent {
  historialPrecio: IHistorialPrecio;

  constructor(
    protected historialPrecioService: HistorialPrecioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.historialPrecioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'historialPrecioListModification',
        content: 'Deleted an historialPrecio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-historial-precio-delete-popup',
  template: ''
})
export class HistorialPrecioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ historialPrecio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HistorialPrecioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.historialPrecio = historialPrecio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/historial-precio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/historial-precio', { outlets: { popup: null } }]);
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
