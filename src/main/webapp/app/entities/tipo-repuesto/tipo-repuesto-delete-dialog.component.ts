import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';

@Component({
  selector: 'jhi-tipo-repuesto-delete-dialog',
  templateUrl: './tipo-repuesto-delete-dialog.component.html'
})
export class TipoRepuestoDeleteDialogComponent {
  tipoRepuesto: ITipoRepuesto;

  constructor(
    protected tipoRepuestoService: TipoRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoRepuestoListModification',
        content: 'Deleted an tipoRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-repuesto-delete-popup',
  template: ''
})
export class TipoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoRepuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoRepuesto = tipoRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-repuesto', { outlets: { popup: null } }]);
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
