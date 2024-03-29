import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
  selector: 'jhi-forma-de-pago-delete-dialog',
  templateUrl: './forma-de-pago-delete-dialog.component.html'
})
export class FormaDePagoDeleteDialogComponent {
  formaDePago: IFormaDePago;

  constructor(
    protected formaDePagoService: FormaDePagoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formaDePagoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'formaDePagoListModification',
        content: 'Deleted an formaDePago'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-forma-de-pago-delete-popup',
  template: ''
})
export class FormaDePagoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formaDePago }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormaDePagoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.formaDePago = formaDePago;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/forma-de-pago', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/forma-de-pago', { outlets: { popup: null } }]);
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
