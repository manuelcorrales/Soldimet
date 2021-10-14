import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarca } from '../marca.model';
import { MarcaService } from '../service/marca.service';
import { MarcaDeleteDialogComponent } from '../delete/marca-delete-dialog.component';

@Component({
  selector: 'jhi-marca',
  templateUrl: './marca.component.html',
})
export class MarcaComponent implements OnInit {
  marcas?: IMarca[];
  isLoading = false;

  constructor(protected marcaService: MarcaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.marcaService.query().subscribe(
      (res: HttpResponse<IMarca[]>) => {
        this.isLoading = false;
        this.marcas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMarca): number {
    return item.id!;
  }

  delete(marca: IMarca): void {
    const modalRef = this.modalService.open(MarcaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.marca = marca;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
