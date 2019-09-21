import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
  selector: 'jhi-categoria-pago-delete-dialog',
  templateUrl: './categoria-pago-delete-dialog.component.html'
})
export class CategoriaPagoDeleteDialogComponent {
  categoriaPago: ICategoriaPago;

  constructor(
    protected categoriaPagoService: CategoriaPagoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categoriaPagoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'categoriaPagoListModification',
        content: 'Deleted an categoriaPago'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-categoria-pago-delete-popup',
  template: ''
})
export class CategoriaPagoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoriaPago }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CategoriaPagoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.categoriaPago = categoriaPago;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/categoria-pago', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/categoria-pago', { outlets: { popup: null } }]);
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
