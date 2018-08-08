import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Cliente, ClienteService } from '../../entities/cliente';
import { ClienteBorrarPopupService } from '../modal-borrar-cliente/cliente-modal-popup.service';

@Component({
    selector: 'jhi-cliente-borrar-dialog',
    templateUrl: './cliente-borrar-dialog.component.html'
})
export class ClienteBorrarDialogComponent {
    cliente: Cliente;

    constructor(private clienteService: ClienteService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'clienteListModification',
                content: 'Cliente eliminado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cliente-borrar-popup',
    template: ''
})
export class ClienteBorrarPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private clientePopupService: ClienteBorrarPopupService) {}
    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.clientePopupService.open(ClienteBorrarDialogComponent as Component, params['id']);
            } else {
                this.clientePopupService.open(ClienteBorrarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
