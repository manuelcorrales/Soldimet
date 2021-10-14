import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoCheque } from '../pago-cheque.model';
import { PagoChequeService } from '../service/pago-cheque.service';
import { PagoChequeDeleteDialogComponent } from '../delete/pago-cheque-delete-dialog.component';

@Component({
  selector: 'jhi-pago-cheque',
  templateUrl: './pago-cheque.component.html',
})
export class PagoChequeComponent implements OnInit {
  pagoCheques?: IPagoCheque[];
  isLoading = false;

  constructor(protected pagoChequeService: PagoChequeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.pagoChequeService.query().subscribe(
      (res: HttpResponse<IPagoCheque[]>) => {
        this.isLoading = false;
        this.pagoCheques = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPagoCheque): number {
    return item.id!;
  }

  delete(pagoCheque: IPagoCheque): void {
    const modalRef = this.modalService.open(PagoChequeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pagoCheque = pagoCheque;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
