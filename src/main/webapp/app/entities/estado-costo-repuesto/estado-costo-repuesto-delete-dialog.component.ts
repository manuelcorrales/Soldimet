import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';

@Component({
  selector: 'jhi-estado-costo-repuesto-delete-dialog',
  templateUrl: './estado-costo-repuesto-delete-dialog.component.html'
})
export class EstadoCostoRepuestoDeleteDialogComponent {
  estadoCostoRepuesto: IEstadoCostoRepuesto;

  constructor(
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoCostoRepuestoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoCostoRepuestoListModification',
        content: 'Deleted an estadoCostoRepuesto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-costo-repuesto-delete-popup',
  template: ''
})
export class EstadoCostoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoCostoRepuestoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.estadoCostoRepuesto = estadoCostoRepuesto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-costo-repuesto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-costo-repuesto', { outlets: { popup: null } }]);
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
