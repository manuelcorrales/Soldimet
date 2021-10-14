import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAplicacion } from '../aplicacion.model';
import { AplicacionService } from '../service/aplicacion.service';
import { AplicacionDeleteDialogComponent } from '../delete/aplicacion-delete-dialog.component';

@Component({
  selector: 'jhi-aplicacion',
  templateUrl: './aplicacion.component.html',
})
export class AplicacionComponent implements OnInit {
  aplicacions?: IAplicacion[];
  isLoading = false;

  constructor(protected aplicacionService: AplicacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.aplicacionService.query().subscribe(
      (res: HttpResponse<IAplicacion[]>) => {
        this.isLoading = false;
        this.aplicacions = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAplicacion): number {
    return item.id!;
  }

  delete(aplicacion: IAplicacion): void {
    const modalRef = this.modalService.open(AplicacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aplicacion = aplicacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
