import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from 'app/entities/cobranza-repuesto/cobranza-repuesto.service';

@Component({
  selector: 'jhi-cobranza-repuesto-delete-dialog',
  templateUrl: './cobranza-repuesto-delete-dialog.component.html'
})
export class CobranzaRepuestoDeleteDialogComponent {
  cobranzaRepuesto: ICobranzaRepuesto;

  constructor(
    protected cobranzaRepuestoService: CobranzaRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cobranzaRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cobranzaRepuestoListModification',
        content: 'Deleted an cobranzaRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cobranza-repuesto-delete-popup',
  template: ''
})
export class CobranzaRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CobranzaRepuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cobranzaRepuesto = cobranzaRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cobranza-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cobranza-repuesto', { outlets: { popup: null } }]);
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
