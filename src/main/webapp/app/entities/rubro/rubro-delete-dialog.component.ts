import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRubro } from 'app/shared/model/rubro.model';
import { RubroService } from 'app/entities/rubro/rubro.service';

@Component({
  selector: 'jhi-rubro-delete-dialog',
  templateUrl: './rubro-delete-dialog.component.html'
})
export class RubroDeleteDialogComponent {
  rubro: IRubro;

  constructor(protected rubroService: RubroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rubroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rubroListModification',
        content: 'Deleted an rubro'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rubro-delete-popup',
  template: ''
})
export class RubroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rubro }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RubroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rubro = rubro;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rubro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rubro', { outlets: { popup: null } }]);
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
