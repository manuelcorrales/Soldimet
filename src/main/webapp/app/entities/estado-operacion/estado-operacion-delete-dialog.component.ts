import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

@Component({
  selector: 'jhi-estado-operacion-delete-dialog',
  templateUrl: './estado-operacion-delete-dialog.component.html'
})
export class EstadoOperacionDeleteDialogComponent {
  estadoOperacion: IEstadoOperacion;

  constructor(
    protected estadoOperacionService: EstadoOperacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoOperacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoOperacionListModification',
        content: 'Deleted an estadoOperacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-operacion-delete-popup',
  template: ''
})
export class EstadoOperacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoOperacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoOperacion = estadoOperacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-operacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-operacion', { outlets: { popup: null } }]);
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
