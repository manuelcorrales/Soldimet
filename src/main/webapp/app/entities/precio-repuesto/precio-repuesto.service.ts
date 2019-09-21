import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

type EntityResponseType = HttpResponse<IPrecioRepuesto>;
type EntityArrayResponseType = HttpResponse<IPrecioRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class PrecioRepuestoService {
  public resourceUrl = SERVER_API_URL + 'api/precio-repuestos';

  constructor(protected http: HttpClient) {}

  create(precioRepuesto: IPrecioRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(precioRepuesto);
    return this.http
      .post<IPrecioRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(precioRepuesto: IPrecioRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(precioRepuesto);
    return this.http
      .put<IPrecioRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrecioRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrecioRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(precioRepuesto: IPrecioRepuesto): IPrecioRepuesto {
    const copy: IPrecioRepuesto = Object.assign({}, precioRepuesto, {
      fecha: precioRepuesto.fecha != null && precioRepuesto.fecha.isValid() ? precioRepuesto.fecha.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((precioRepuesto: IPrecioRepuesto) => {
        precioRepuesto.fecha = precioRepuesto.fecha != null ? moment(precioRepuesto.fecha) : null;
      });
    }
    return res;
  }
}
