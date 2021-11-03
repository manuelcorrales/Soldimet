import { StockArticulo } from './../../entities/stock-articulo/stock-articulo.model';
import { StockArticuloService } from './../../entities/stock-articulo/service/stock-articulo.service';
import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateUpdateStockComponent } from './create-update-stock.component';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class StockModalPopupService {
  private ngbModalRef: NgbModalRef | null;

  constructor(private modalService: NgbModal, private router: Router, private stockArticuloService: StockArticuloService) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>(resolve => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef!);
      }
      if (id) {
        this.stockArticuloService.find(id).subscribe((response: HttpResponse<StockArticulo>) => {
          this.ngbModalRef = this.stockModalRef(component, response.body!);
          resolve(this.ngbModalRef);
        });
      } else {
        setTimeout(() => {
          this.ngbModalRef = this.stockModalRef(component, new StockArticulo());
          resolve(this.ngbModalRef);
        }, 0);
      }
    });
  }

  stockModalRef(component: Component, stock: StockArticulo): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stock = stock;
    modalRef.result.then(
      () => {
        this.router.navigate(['/', { outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      },
      () => {
        this.router.navigate(['/', { outlets: { popup: null } }], { replaceUrl: true });
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}

@Component({
  selector: 'jhi-stock-modal-popup',
  template: '',
})
export class StockModalPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private stockPopupService: StockModalPopupService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.stockPopupService.open(CreateUpdateStockComponent as Component, params['id']);
      } else {
        this.stockPopupService.open(CreateUpdateStockComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
