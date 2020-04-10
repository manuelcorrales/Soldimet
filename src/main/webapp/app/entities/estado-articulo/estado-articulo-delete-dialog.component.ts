import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';

@Component({
  selector: 'jhi-estado-articulo-delete-dialog',
  templateUrl: './estado-articulo-delete-dialog.component.html'
})
export class EstadoArticuloDeleteDialogComponent {
  estadoArticulo: IEstadoArticulo;

  constructor(
    protected estadoArticuloService: EstadoArticuloService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estadoArticuloService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'estadoArticuloListModification',
        content: 'Deleted an estadoArticulo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-estado-articulo-delete-popup',
  template: ''
})
export class EstadoArticuloDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EstadoArticuloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.estadoArticulo = estadoArticulo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/estado-articulo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/estado-articulo', { outlets: { popup: null } }]);
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
