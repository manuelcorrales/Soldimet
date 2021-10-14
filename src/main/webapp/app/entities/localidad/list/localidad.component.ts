import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocalidad } from '../localidad.model';
import { LocalidadService } from '../service/localidad.service';
import { LocalidadDeleteDialogComponent } from '../delete/localidad-delete-dialog.component';

@Component({
  selector: 'jhi-localidad',
  templateUrl: './localidad.component.html',
})
export class LocalidadComponent implements OnInit {
  localidads?: ILocalidad[];
  isLoading = false;

  constructor(protected localidadService: LocalidadService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.localidadService.query().subscribe(
      (res: HttpResponse<ILocalidad[]>) => {
        this.isLoading = false;
        this.localidads = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILocalidad): number {
    return item.id!;
  }

  delete(localidad: ILocalidad): void {
    const modalRef = this.modalService.open(LocalidadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.localidad = localidad;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
