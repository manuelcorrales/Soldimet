import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { Page } from 'app/dto/page/page';

type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

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

  findByFilteredPage(text, page = 0, size = 15): Observable<Page<Cliente>> {
    let url = `${this.resourceUrl}${this.buscarClientesUrl}`;
    if (page != null) {
      url += `/?page=${page}&size=${size}`;
    }
    if (text != null) {
      url += `&filtro=${text}`;
    }
    return this.http.get<Page<Cliente>>(url);
  }

  eliminarCliente(id): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.eliminarClienteUrl}`;
    return this.http.post<Cliente>(url, id);
  }

  getCliente(id): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.getClienteUrl}${id}`;
    return this.http.get<Cliente>(url);
  }
}
