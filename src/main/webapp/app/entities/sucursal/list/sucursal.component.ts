import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal.service';
import { SucursalDeleteDialogComponent } from '../delete/sucursal-delete-dialog.component';

@Component({
  selector: 'jhi-sucursal',
  templateUrl: './sucursal.component.html',
})
export class SucursalComponent implements OnInit {
  sucursals?: ISucursal[];
  isLoading = false;

  constructor(protected sucursalService: SucursalService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.sucursalService.query().subscribe(
      (res: HttpResponse<ISucursal[]>) => {
        this.isLoading = false;
        this.sucursals = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISucursal): number {
    return item.id!;
  }

  delete(sucursal: ISucursal): void {
    const modalRef = this.modalService.open(SucursalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sucursal = sucursal;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
