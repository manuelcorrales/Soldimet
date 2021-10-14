import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';
import { ListaPrecioRectificacionCRAMDeleteDialogComponent } from '../delete/lista-precio-rectificacion-cram-delete-dialog.component';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram',
  templateUrl: './lista-precio-rectificacion-cram.component.html',
})
export class ListaPrecioRectificacionCRAMComponent implements OnInit {
  listaPrecioRectificacionCRAMS?: IListaPrecioRectificacionCRAM[];
  isLoading = false;

  constructor(protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.listaPrecioRectificacionCRAMService.query().subscribe(
      (res: HttpResponse<IListaPrecioRectificacionCRAM[]>) => {
        this.isLoading = false;
        this.listaPrecioRectificacionCRAMS = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IListaPrecioRectificacionCRAM): number {
    return item.id!;
  }

  delete(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): void {
    const modalRef = this.modalService.open(ListaPrecioRectificacionCRAMDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
