import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICobranzaOperacion } from '../cobranza-operacion.model';
import { CobranzaOperacionService } from '../service/cobranza-operacion.service';
import { CobranzaOperacionDeleteDialogComponent } from '../delete/cobranza-operacion-delete-dialog.component';

@Component({
  selector: 'jhi-cobranza-operacion',
  templateUrl: './cobranza-operacion.component.html',
})
export class CobranzaOperacionComponent implements OnInit {
  cobranzaOperacions?: ICobranzaOperacion[];
  isLoading = false;

  constructor(protected cobranzaOperacionService: CobranzaOperacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cobranzaOperacionService.query().subscribe(
      (res: HttpResponse<ICobranzaOperacion[]>) => {
        this.isLoading = false;
        this.cobranzaOperacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICobranzaOperacion): number {
    return item.id!;
  }

  delete(cobranzaOperacion: ICobranzaOperacion): void {
    const modalRef = this.modalService.open(CobranzaOperacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cobranzaOperacion = cobranzaOperacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
