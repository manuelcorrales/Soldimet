import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPedidoRepuesto, getPedidoRepuestoIdentifier } from '../pedido-repuesto.model';

export type EntityResponseType = HttpResponse<IPedidoRepuesto>;
export type EntityArrayResponseType = HttpResponse<IPedidoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class PedidoRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pedido-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pedidoRepuesto: IPedidoRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedidoRepuesto);
    return this.http
      .post<IPedidoRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pedidoRepuesto: IPedidoRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedidoRepuesto);
    return this.http
      .put<IPedidoRepuesto>(`${this.resourceUrl}/${getPedidoRepuestoIdentifier(pedidoRepuesto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(pedidoRepuesto: IPedidoRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pedidoRepuesto);
    return this.http
      .patch<IPedidoRepuesto>(`${this.resourceUrl}/${getPedidoRepuestoIdentifier(pedidoRepuesto) as number}`, copy, { observe: 'response' })
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPedidoRepuestoToCollectionIfMissing(
    pedidoRepuestoCollection: IPedidoRepuesto[],
    ...pedidoRepuestosToCheck: (IPedidoRepuesto | null | undefined)[]
  ): IPedidoRepuesto[] {
    const pedidoRepuestos: IPedidoRepuesto[] = pedidoRepuestosToCheck.filter(isPresent);
    if (pedidoRepuestos.length > 0) {
      const pedidoRepuestoCollectionIdentifiers = pedidoRepuestoCollection.map(
        pedidoRepuestoItem => getPedidoRepuestoIdentifier(pedidoRepuestoItem)!
      );
      const pedidoRepuestosToAdd = pedidoRepuestos.filter(pedidoRepuestoItem => {
        const pedidoRepuestoIdentifier = getPedidoRepuestoIdentifier(pedidoRepuestoItem);
        if (pedidoRepuestoIdentifier == null || pedidoRepuestoCollectionIdentifiers.includes(pedidoRepuestoIdentifier)) {
          return false;
        }
        pedidoRepuestoCollectionIdentifiers.push(pedidoRepuestoIdentifier);
        return true;
      });
      return [...pedidoRepuestosToAdd, ...pedidoRepuestoCollection];
    }
    return pedidoRepuestoCollection;
  }

  protected convertDateFromClient(pedidoRepuesto: IPedidoRepuesto): IPedidoRepuesto {
    return Object.assign({}, pedidoRepuesto, {
      fechaCreacion: pedidoRepuesto.fechaCreacion?.isValid() ? pedidoRepuesto.fechaCreacion.format(DATE_FORMAT) : undefined,
      fechaPedido: pedidoRepuesto.fechaPedido?.isValid() ? pedidoRepuesto.fechaPedido.format(DATE_FORMAT) : undefined,
      fechaRecibo: pedidoRepuesto.fechaRecibo?.isValid() ? pedidoRepuesto.fechaRecibo.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacion = res.body.fechaCreacion ? dayjs(res.body.fechaCreacion) : undefined;
      res.body.fechaPedido = res.body.fechaPedido ? dayjs(res.body.fechaPedido) : undefined;
      res.body.fechaRecibo = res.body.fechaRecibo ? dayjs(res.body.fechaRecibo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pedidoRepuesto: IPedidoRepuesto) => {
        pedidoRepuesto.fechaCreacion = pedidoRepuesto.fechaCreacion ? dayjs(pedidoRepuesto.fechaCreacion) : undefined;
        pedidoRepuesto.fechaPedido = pedidoRepuesto.fechaPedido ? dayjs(pedidoRepuesto.fechaPedido) : undefined;
        pedidoRepuesto.fechaRecibo = pedidoRepuesto.fechaRecibo ? dayjs(pedidoRepuesto.fechaRecibo) : undefined;
      });
    }
    return res;
  }
}
