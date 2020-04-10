import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';

@Component({
  selector: 'jhi-pago-cheque-delete-dialog',
  templateUrl: './pago-cheque-delete-dialog.component.html'
})
export class PagoChequeDeleteDialogComponent {
  pagoCheque: IPagoCheque;

  constructor(
    protected pagoChequeService: PagoChequeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pagoChequeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pagoChequeListModification',
        content: 'Deleted an pagoCheque'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pago-cheque-delete-popup',
  template: ''
})
export class PagoChequeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagoCheque }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PagoChequeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pagoCheque = pagoCheque;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pago-cheque', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pago-cheque', { outlets: { popup: null } }]);
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
