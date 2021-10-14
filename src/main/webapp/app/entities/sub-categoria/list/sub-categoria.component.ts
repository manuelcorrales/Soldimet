import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubCategoria } from '../sub-categoria.model';
import { SubCategoriaService } from '../service/sub-categoria.service';
import { SubCategoriaDeleteDialogComponent } from '../delete/sub-categoria-delete-dialog.component';

@Component({
  selector: 'jhi-sub-categoria',
  templateUrl: './sub-categoria.component.html',
})
export class SubCategoriaComponent implements OnInit {
  subCategorias?: ISubCategoria[];
  isLoading = false;

  constructor(protected subCategoriaService: SubCategoriaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.subCategoriaService.query().subscribe(
      (res: HttpResponse<ISubCategoria[]>) => {
        this.isLoading = false;
        this.subCategorias = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISubCategoria): number {
    return item.id!;
  }

  delete(subCategoria: ISubCategoria): void {
    const modalRef = this.modalService.open(SubCategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subCategoria = subCategoria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
