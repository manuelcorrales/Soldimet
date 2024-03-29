import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

type EntityResponseType = HttpResponse<IMovimientoPresupuesto>;
type EntityArrayResponseType = HttpResponse<IMovimientoPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoPresupuestoService {
  public resourceUrl = SERVER_API_URL + 'api/movimiento-presupuestos';

  constructor(protected http: HttpClient) {}

  create(movimientoPresupuesto: IMovimientoPresupuesto): Observable<EntityResponseType> {
    return this.http.post<IMovimientoPresupuesto>(this.resourceUrl, movimientoPresupuesto, { observe: 'response' });
  }

  update(movimientoPresupuesto: IMovimientoPresupuesto): Observable<EntityResponseType> {
    return this.http.put<IMovimientoPresupuesto>(this.resourceUrl, movimientoPresupuesto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovimientoPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovimientoPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
