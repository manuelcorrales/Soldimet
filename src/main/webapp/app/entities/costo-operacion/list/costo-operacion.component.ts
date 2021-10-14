import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoOperacion } from '../costo-operacion.model';
import { CostoOperacionService } from '../service/costo-operacion.service';
import { CostoOperacionDeleteDialogComponent } from '../delete/costo-operacion-delete-dialog.component';

@Component({
  selector: 'jhi-costo-operacion',
  templateUrl: './costo-operacion.component.html',
})
export class CostoOperacionComponent implements OnInit {
  costoOperacions?: ICostoOperacion[];
  isLoading = false;

  constructor(protected costoOperacionService: CostoOperacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.costoOperacionService.query().subscribe(
      (res: HttpResponse<ICostoOperacion[]>) => {
        this.isLoading = false;
        this.costoOperacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICostoOperacion): number {
    return item.id!;
  }

  delete(costoOperacion: ICostoOperacion): void {
    const modalRef = this.modalService.open(CostoOperacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.costoOperacion = costoOperacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
