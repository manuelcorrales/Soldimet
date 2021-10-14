import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';
import { MedioDePagoChequeDeleteDialogComponent } from '../delete/medio-de-pago-cheque-delete-dialog.component';

@Component({
  selector: 'jhi-medio-de-pago-cheque',
  templateUrl: './medio-de-pago-cheque.component.html',
})
export class MedioDePagoChequeComponent implements OnInit {
  medioDePagoCheques?: IMedioDePagoCheque[];
  isLoading = false;

  constructor(protected medioDePagoChequeService: MedioDePagoChequeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.medioDePagoChequeService.query().subscribe(
      (res: HttpResponse<IMedioDePagoCheque[]>) => {
        this.isLoading = false;
        this.medioDePagoCheques = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMedioDePagoCheque): number {
    return item.id!;
  }

  delete(medioDePagoCheque: IMedioDePagoCheque): void {
    const modalRef = this.modalService.open(MedioDePagoChequeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.medioDePagoCheque = medioDePagoCheque;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
