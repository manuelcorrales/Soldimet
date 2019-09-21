import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';

type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private resourceUrl = SERVER_API_URL + 'api/cliente';
  private activarClienteUrl = '/activarCliente';

  constructor(private http: HttpClient) {}

  activarCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.resourceUrl}${this.activarClienteUrl}`;
    return this.http.post<Cliente>(url, cliente);
  }
}
