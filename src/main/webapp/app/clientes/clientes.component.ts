import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ClientesService } from 'app/clientes/clientes.service';
import { Subscription } from 'rxjs';
import { Principal } from 'app/core/auth/principal.service';

@Component({
  selector: 'jhi-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit, OnDestroy {
  clientes: ICliente[] = [];
  totalClientes: ICliente[] = [];
  currentAccount: any;
  eventSubscriber: Subscription;

  page = 1;
  pageSize = 15;

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
        this.totalClientes = res.body;
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

  _sortCliente(a: ICliente, b: ICliente) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  search(text: string) {
    const clientes = this.totalClientes.filter(cliente => {
      const term = text.toLowerCase();
      return (
        cliente.apellido.toLowerCase().includes(term) ||
        cliente.persona.nombre.toLowerCase().includes(term) ||
        cliente.persona.direccion.calle.toString().includes(term)
      );
    });
    this.clientes = clientes.sort(this._sortCliente);
  }
}
