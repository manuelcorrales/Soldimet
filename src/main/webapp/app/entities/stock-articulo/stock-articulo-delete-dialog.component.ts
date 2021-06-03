import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockArticulo } from 'app/shared/model/stock-articulo.model';
import { StockArticuloService } from './stock-articulo.service';

@Component({
  selector: 'jhi-stock-articulo-delete-dialog',
  templateUrl: './stock-articulo-delete-dialog.component.html'
})
export class StockArticuloDeleteDialogComponent {
  stockArticulo: IStockArticulo;

  constructor(
    protected stockArticuloService: StockArticuloService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.stockArticuloService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'stockArticuloListModification',
        content: 'Deleted an stockArticulo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-stock-articulo-delete-popup',
  template: ''
})
export class StockArticuloDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stockArticulo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StockArticuloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.stockArticulo = stockArticulo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/stock-articulo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/stock-articulo', { outlets: { popup: null } }]);
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
