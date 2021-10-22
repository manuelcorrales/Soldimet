import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Page } from 'app/dto/page/page';
import { Cliente } from 'app/entities/cliente/cliente.model';
@Injectable({ providedIn: 'root' })
export class ClientesService {
  private resourceUrl = SERVER_API_URL + 'api/cliente';
  private activarClienteUrl = '/activarCliente';
  private buscarClientesUrl = '/buscarClientes';
  private eliminarClienteUrl = '/eliminarCliente';
  private getClienteUrl = '/get/';

  constructor(private http: HttpClient) {}

  activarCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.activarClienteUrl}`;
    return this.http.post<Cliente>(url, cliente);
  }

  findByFilteredPage(text: string | null, page = 0, size = 15): Observable<Page<Cliente>> {
    let url = `${this.resourceUrl}${this.buscarClientesUrl}`;
    url += `/?page=${page}&size=${size}`;
    if (text != null) {
      url += `&filtro=${text}`;
    }
    return this.http.get<Page<Cliente>>(url);
  }

  eliminarCliente(id: number): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.eliminarClienteUrl}`;
    return this.http.post<Cliente>(url, id);
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.getClienteUrl}${id}`;
    return this.http.get<Cliente>(url);
  }
}
