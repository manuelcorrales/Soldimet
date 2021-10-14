import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBanco } from '../banco.model';
import { BancoService } from '../service/banco.service';
import { BancoDeleteDialogComponent } from '../delete/banco-delete-dialog.component';

@Component({
  selector: 'jhi-banco',
  templateUrl: './banco.component.html',
})
export class BancoComponent implements OnInit {
  bancos?: IBanco[];
  isLoading = false;

  constructor(protected bancoService: BancoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.bancoService.query().subscribe(
      (res: HttpResponse<IBanco[]>) => {
        this.isLoading = false;
        this.bancos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBanco): number {
    return item.id!;
  }

  delete(banco: IBanco): void {
    const modalRef = this.modalService.open(BancoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.banco = banco;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
