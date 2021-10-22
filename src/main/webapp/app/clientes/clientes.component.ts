import { EventManager } from 'app/core/util/event-manager.service';
import { AlertService } from 'app/core/util/alert.service';
import { Cliente } from 'app/entities/cliente/cliente.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { ClientesService } from 'app/clientes/clientes.service';
import { Subscription } from 'rxjs';
import { Principal } from 'app/core/auth/principal.service';
import { BaseFilterPageableComponent } from 'app/shared/base-filter-pageable/base-filter-pageable.component';

@Component({
  selector: 'jhi-clientes',
  templateUrl: './clientes.component.html',
  styles: [],
})
export class ClientesComponent extends BaseFilterPageableComponent<Cliente> implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  totalClientes: Cliente[] = [];
  currentAccount: any;
  eventSubscriber: Subscription | null = null;

  page = 1;
  pageSize = 15;

  constructor(
    protected clienteService: ClienteService,
    protected jhiAlertService: AlertService,
    private eventManager: EventManager,
    private principal: Principal,
    private clientesService: ClientesService
  ) {
    super(jhiAlertService);
    this.searchableService = clientesService;
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
    this.eventManager.destroy(this.eventSubscriber!);
  }

  trackId(index: number, item: Cliente) {
    return item.id;
  }

  registerChangeInClientes() {
    this.eventSubscriber = this.eventManager.subscribe('clienteListModification', () => this.requestContent());
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
