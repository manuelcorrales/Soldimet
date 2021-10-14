import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHastaDeleteDialogComponent } from '../delete/lista-precio-desde-hasta-delete-dialog.component';

@Component({
  selector: 'jhi-lista-precio-desde-hasta',
  templateUrl: './lista-precio-desde-hasta.component.html',
})
export class ListaPrecioDesdeHastaComponent implements OnInit {
  listaPrecioDesdeHastas?: IListaPrecioDesdeHasta[];
  isLoading = false;

  constructor(protected listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.listaPrecioDesdeHastaService.query().subscribe(
      (res: HttpResponse<IListaPrecioDesdeHasta[]>) => {
        this.isLoading = false;
        this.listaPrecioDesdeHastas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IListaPrecioDesdeHasta): number {
    return item.id!;
  }

  delete(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): void {
    const modalRef = this.modalService.open(ListaPrecioDesdeHastaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
