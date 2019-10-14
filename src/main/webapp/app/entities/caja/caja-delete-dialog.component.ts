import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';

@Component({
  selector: 'jhi-caja-delete-dialog',
  templateUrl: './caja-delete-dialog.component.html'
})
export class CajaDeleteDialogComponent {
  caja: ICaja;

  constructor(protected cajaService: CajaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cajaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cajaListModification',
        content: 'Deleted an caja'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-caja-delete-popup',
  template: ''
})
export class CajaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ caja }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CajaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.caja = caja;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/caja', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/caja', { outlets: { popup: null } }]);
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
