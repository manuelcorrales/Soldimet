import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
  selector: 'jhi-pago-efectivo-delete-dialog',
  templateUrl: './pago-efectivo-delete-dialog.component.html'
})
export class PagoEfectivoDeleteDialogComponent {
  pagoEfectivo: IPagoEfectivo;

  constructor(
    protected pagoEfectivoService: PagoEfectivoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pagoEfectivoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pagoEfectivoListModification',
        content: 'Deleted an pagoEfectivo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pago-efectivo-delete-popup',
  template: ''
})
export class PagoEfectivoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PagoEfectivoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pagoEfectivo = pagoEfectivo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pago-efectivo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pago-efectivo', { outlets: { popup: null } }]);
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
