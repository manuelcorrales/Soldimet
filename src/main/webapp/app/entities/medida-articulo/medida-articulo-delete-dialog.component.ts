import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticuloService } from './medida-articulo.service';

@Component({
  selector: 'jhi-medida-articulo-delete-dialog',
  templateUrl: './medida-articulo-delete-dialog.component.html'
})
export class MedidaArticuloDeleteDialogComponent {
  medidaArticulo: IMedidaArticulo;

  constructor(
    protected medidaArticuloService: MedidaArticuloService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.medidaArticuloService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'medidaArticuloListModification',
        content: 'Deleted an medidaArticulo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-medida-articulo-delete-popup',
  template: ''
})
export class MedidaArticuloDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ medidaArticulo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MedidaArticuloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.medidaArticulo = medidaArticulo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/medida-articulo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/medida-articulo', { outlets: { popup: null } }]);
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
