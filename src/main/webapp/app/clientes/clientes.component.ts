import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { ClientesService } from 'app/clientes/clientes.service';
import { Subscription } from 'rxjs';
import { Principal } from 'app/core/auth/principal.service';
import { BaseFilterPageableComponent } from 'app/shared/base-filter-pageable/base-filter-pageable.component';

@Component({
  selector: 'jhi-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent extends BaseFilterPageableComponent<ICliente> implements OnInit, OnDestroy {
  clientes: ICliente[] = [];
  totalClientes: ICliente[] = [];
  currentAccount: any;
  eventSubscriber: Subscription;

  page = 1;
  pageSize = 15;

  constructor(
    protected clienteService: ClienteService,
    protected jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal,
    private clientesService: ClientesService
  ) {
    super();
    this.searchableService = clientesService;
    this.alertService = jhiAlertService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInClientes();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: Cliente) {
    return item.id;
  }

  registerChangeInClientes() {
    this.eventSubscriber = this.eventManager.subscribe('clienteListModification', response => this.requestContent());
  }

  activarCliente(cliente: Cliente) {
    this.clientesService.activarCliente(cliente).subscribe(
      (clienteResp: Cliente) => {
        this.clientes.forEach((clienteEnTabla: Cliente) => {
          if (clienteEnTabla.id === clienteResp.id) {
            clienteEnTabla = clienteResp;
          }
        });
        this.requestContent();
      },
      error => this.onError(error.message)
    );
  }
}
