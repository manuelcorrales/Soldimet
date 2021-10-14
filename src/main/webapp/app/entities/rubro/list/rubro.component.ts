import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRubro } from '../rubro.model';
import { RubroService } from '../service/rubro.service';
import { RubroDeleteDialogComponent } from '../delete/rubro-delete-dialog.component';

@Component({
  selector: 'jhi-rubro',
  templateUrl: './rubro.component.html',
})
export class RubroComponent implements OnInit {
  rubros?: IRubro[];
  isLoading = false;

  constructor(protected rubroService: RubroService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rubroService.query().subscribe(
      (res: HttpResponse<IRubro[]>) => {
        this.isLoading = false;
        this.rubros = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IRubro): number {
    return item.id!;
  }

  delete(rubro: IRubro): void {
    const modalRef = this.modalService.open(RubroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rubro = rubro;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
