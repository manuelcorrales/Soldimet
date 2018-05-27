import { Component, OnInit, OnDestroy } from '@angular/core';
import {Cliente} from '../entities/cliente/cliente.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {ClienteService} from '../entities/cliente/cliente.service';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Principal} from '../shared/auth/principal.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'jhi-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit, OnDestroy  {

    clientes: Cliente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clienteService: ClienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clienteService.query().subscribe(
            (res: ResponseWrapper) => {
                this.clientes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
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
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
