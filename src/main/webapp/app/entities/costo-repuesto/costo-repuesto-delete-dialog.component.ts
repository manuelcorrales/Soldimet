import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from 'app/entities/costo-repuesto/costo-repuesto.service';

@Component({
  selector: 'jhi-costo-repuesto-delete-dialog',
  templateUrl: './costo-repuesto-delete-dialog.component.html'
})
export class CostoRepuestoDeleteDialogComponent {
  costoRepuesto: ICostoRepuesto;

  constructor(
    protected costoRepuestoService: CostoRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.costoRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'costoRepuestoListModification',
        content: 'Deleted an costoRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-costo-repuesto-delete-popup',
  template: ''
})
export class CostoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CostoRepuestoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.costoRepuesto = costoRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/costo-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/costo-repuesto', { outlets: { popup: null } }]);
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
