import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';

@Component({
  selector: 'jhi-cilindrada-delete-dialog',
  templateUrl: './cilindrada-delete-dialog.component.html'
})
export class CilindradaDeleteDialogComponent {
  cilindrada: ICilindrada;

  constructor(
    protected cilindradaService: CilindradaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cilindradaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cilindradaListModification',
        content: 'Deleted an cilindrada'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cilindrada-delete-popup',
  template: ''
})
export class CilindradaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cilindrada }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CilindradaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cilindrada = cilindrada;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cilindrada', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cilindrada', { outlets: { popup: null } }]);
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
