import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
  selector: 'jhi-precio-repuesto-delete-dialog',
  templateUrl: './precio-repuesto-delete-dialog.component.html'
})
export class PrecioRepuestoDeleteDialogComponent {
  precioRepuesto: IPrecioRepuesto;

  constructor(
    protected precioRepuestoService: PrecioRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.precioRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'precioRepuestoListModification',
        content: 'Deleted an precioRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-precio-repuesto-delete-popup',
  template: ''
})
export class PrecioRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PrecioRepuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.precioRepuesto = precioRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/precio-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/precio-repuesto', { outlets: { popup: null } }]);
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
