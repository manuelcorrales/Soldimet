import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';

@Component({
  selector: 'jhi-cobranza-operacion-delete-dialog',
  templateUrl: './cobranza-operacion-delete-dialog.component.html'
})
export class CobranzaOperacionDeleteDialogComponent {
  cobranzaOperacion: ICobranzaOperacion;

  constructor(
    protected cobranzaOperacionService: CobranzaOperacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cobranzaOperacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cobranzaOperacionListModification',
        content: 'Deleted an cobranzaOperacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cobranza-operacion-delete-popup',
  template: ''
})
export class CobranzaOperacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CobranzaOperacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cobranzaOperacion = cobranzaOperacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cobranza-operacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cobranza-operacion', { outlets: { popup: null } }]);
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
