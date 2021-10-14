import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICilindrada } from '../cilindrada.model';
import { CilindradaService } from '../service/cilindrada.service';
import { CilindradaDeleteDialogComponent } from '../delete/cilindrada-delete-dialog.component';

@Component({
  selector: 'jhi-cilindrada',
  templateUrl: './cilindrada.component.html',
})
export class CilindradaComponent implements OnInit {
  cilindradas?: ICilindrada[];
  isLoading = false;

  constructor(protected cilindradaService: CilindradaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cilindradaService.query().subscribe(
      (res: HttpResponse<ICilindrada[]>) => {
        this.isLoading = false;
        this.cilindradas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICilindrada): number {
    return item.id!;
  }

  delete(cilindrada: ICilindrada): void {
    const modalRef = this.modalService.open(CilindradaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cilindrada = cilindrada;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
