import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';

@Component({
  selector: 'jhi-tipo-tarjeta-delete-dialog',
  templateUrl: './tipo-tarjeta-delete-dialog.component.html'
})
export class TipoTarjetaDeleteDialogComponent {
  tipoTarjeta: ITipoTarjeta;

  constructor(
    protected tipoTarjetaService: TipoTarjetaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoTarjetaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoTarjetaListModification',
        content: 'Deleted an tipoTarjeta'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-tarjeta-delete-popup',
  template: ''
})
export class TipoTarjetaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoTarjeta }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoTarjetaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoTarjeta = tipoTarjeta;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-tarjeta', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-tarjeta', { outlets: { popup: null } }]);
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
