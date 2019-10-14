import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
  selector: 'jhi-estado-cobranza-operacion-delete-dialog',
  templateUrl: './estado-cobranza-operacion-delete-dialog.component.html'
})
export class EstadoCobranzaOperacionDeleteDialogComponent {
  estadoCobranzaOperacion: IEstadoCobranzaOperacion;

  constructor(
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoCobranzaOperacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoCobranzaOperacionListModification',
        content: 'Deleted an estadoCobranzaOperacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-cobranza-operacion-delete-popup',
  template: ''
})
export class EstadoCobranzaOperacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoCobranzaOperacionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.estadoCobranzaOperacion = estadoCobranzaOperacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-cobranza-operacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-cobranza-operacion', { outlets: { popup: null } }]);
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
