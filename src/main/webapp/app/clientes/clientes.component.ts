import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResponseWrapper } from 'app/shared/model/response-wrapper.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs/Subscription';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Principal } from 'app/core';
import { ClientesService } from 'app/clientes/clientes.service';

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
        private principal: Principal,
        private clientesService: ClientesService
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

    activarCliente(cliente: Cliente) {
        this.clientesService.activarCliente(cliente).subscribe((clienteResp: Cliente) => {
            this.clientes.forEach((clienteEnTabla: Cliente) => {
                if (clienteEnTabla.id === clienteResp.id) {
                    clienteEnTabla = clienteResp;
                }
            });
            this.loadAll();
        });
    }

    onSearch(searchValue) {}
}
