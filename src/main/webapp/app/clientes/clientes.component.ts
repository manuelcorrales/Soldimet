import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResponseWrapper } from '../shared/model/response-wrapper.model';
import { ClienteService } from '../entities/cliente/cliente.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs/Subscription';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { HttpResponse, HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { Principal } from 'app/core';

@Component({
    selector: 'jhi-clientes',
    templateUrl: './clientes.component.html',
    styles: []
})
export class ClientesComponent implements OnInit, OnDestroy {
    clientes: ICliente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clienteService: ClienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cliente) {
        return item.id;
    }
    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', response => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
