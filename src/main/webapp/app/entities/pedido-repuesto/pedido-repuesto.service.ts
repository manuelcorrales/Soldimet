import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

type EntityResponseType = HttpResponse<IPedidoRepuesto>;
type EntityArrayResponseType = HttpResponse<IPedidoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class PedidoRepuestoService {
  public resourceUrl = SERVER_API_URL + 'api/pedido-repuestos';

  constructor(protected http: HttpClient) {}

  create(pedidoRepuesto: IPedidoRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedidoRepuesto);
    return this.http
      .post<IPedidoRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pedidoRepuesto: IPedidoRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedidoRepuesto);
    return this.http
      .put<IPedidoRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPedidoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPedidoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pedidoRepuesto: IPedidoRepuesto): IPedidoRepuesto {
    const copy: IPedidoRepuesto = Object.assign({}, pedidoRepuesto, {
      fechaCreacion:
        pedidoRepuesto.fechaCreacion != null && pedidoRepuesto.fechaCreacion.isValid()
          ? pedidoRepuesto.fechaCreacion.format(DATE_FORMAT)
          : null,
      fechaPedido:
        pedidoRepuesto.fechaPedido != null && pedidoRepuesto.fechaPedido.isValid() ? pedidoRepuesto.fechaPedido.format(DATE_FORMAT) : null,
      fechaRecibo:
        pedidoRepuesto.fechaRecibo != null && pedidoRepuesto.fechaRecibo.isValid() ? pedidoRepuesto.fechaRecibo.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacion = res.body.fechaCreacion != null ? moment(res.body.fechaCreacion) : null;
      res.body.fechaPedido = res.body.fechaPedido != null ? moment(res.body.fechaPedido) : null;
      res.body.fechaRecibo = res.body.fechaRecibo != null ? moment(res.body.fechaRecibo) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pedidoRepuesto: IPedidoRepuesto) => {
        pedidoRepuesto.fechaCreacion = pedidoRepuesto.fechaCreacion != null ? moment(pedidoRepuesto.fechaCreacion) : null;
        pedidoRepuesto.fechaPedido = pedidoRepuesto.fechaPedido != null ? moment(pedidoRepuesto.fechaPedido) : null;
        pedidoRepuesto.fechaRecibo = pedidoRepuesto.fechaRecibo != null ? moment(pedidoRepuesto.fechaRecibo) : null;
      });
    }
    return res;
  }
}
