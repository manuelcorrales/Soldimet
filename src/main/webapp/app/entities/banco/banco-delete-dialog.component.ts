import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from './banco.service';

@Component({
  selector: 'jhi-banco-delete-dialog',
  templateUrl: './banco-delete-dialog.component.html'
})
export class BancoDeleteDialogComponent {
  banco: IBanco;

  constructor(protected bancoService: BancoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bancoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bancoListModification',
        content: 'Deleted an banco'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-banco-delete-popup',
  template: ''
})
export class BancoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ banco }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BancoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.banco = banco;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/banco', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/banco', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
