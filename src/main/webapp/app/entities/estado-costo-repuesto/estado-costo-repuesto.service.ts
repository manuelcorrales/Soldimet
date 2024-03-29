import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

type EntityResponseType = HttpResponse<IEstadoCostoRepuesto>;
type EntityArrayResponseType = HttpResponse<IEstadoCostoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoCostoRepuestoService {
  public resourceUrl = SERVER_API_URL + 'api/estado-costo-repuestos';

  constructor(protected http: HttpClient) {}

  create(estadoCostoRepuesto: IEstadoCostoRepuesto): Observable<EntityResponseType> {
    return this.http.post<IEstadoCostoRepuesto>(this.resourceUrl, estadoCostoRepuesto, { observe: 'response' });
  }

  update(estadoCostoRepuesto: IEstadoCostoRepuesto): Observable<EntityResponseType> {
    return this.http.put<IEstadoCostoRepuesto>(this.resourceUrl, estadoCostoRepuesto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoCostoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoCostoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
