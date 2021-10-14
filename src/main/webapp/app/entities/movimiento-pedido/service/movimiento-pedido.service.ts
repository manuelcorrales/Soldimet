import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimientoPedido, getMovimientoPedidoIdentifier } from '../movimiento-pedido.model';

export type EntityResponseType = HttpResponse<IMovimientoPedido>;
export type EntityArrayResponseType = HttpResponse<IMovimientoPedido[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoPedidoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimiento-pedidos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimientoPedido: IMovimientoPedido): Observable<EntityResponseType> {
    return this.http.post<IMovimientoPedido>(this.resourceUrl, movimientoPedido, { observe: 'response' });
  }

  update(movimientoPedido: IMovimientoPedido): Observable<EntityResponseType> {
    return this.http.put<IMovimientoPedido>(
      `${this.resourceUrl}/${getMovimientoPedidoIdentifier(movimientoPedido) as number}`,
      movimientoPedido,
      { observe: 'response' }
    );
  }

  partialUpdate(movimientoPedido: IMovimientoPedido): Observable<EntityResponseType> {
    return this.http.patch<IMovimientoPedido>(
      `${this.resourceUrl}/${getMovimientoPedidoIdentifier(movimientoPedido) as number}`,
      movimientoPedido,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovimientoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovimientoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientoPedidoToCollectionIfMissing(
    movimientoPedidoCollection: IMovimientoPedido[],
    ...movimientoPedidosToCheck: (IMovimientoPedido | null | undefined)[]
  ): IMovimientoPedido[] {
    const movimientoPedidos: IMovimientoPedido[] = movimientoPedidosToCheck.filter(isPresent);
    if (movimientoPedidos.length > 0) {
      const movimientoPedidoCollectionIdentifiers = movimientoPedidoCollection.map(
        movimientoPedidoItem => getMovimientoPedidoIdentifier(movimientoPedidoItem)!
      );
      const movimientoPedidosToAdd = movimientoPedidos.filter(movimientoPedidoItem => {
        const movimientoPedidoIdentifier = getMovimientoPedidoIdentifier(movimientoPedidoItem);
        if (movimientoPedidoIdentifier == null || movimientoPedidoCollectionIdentifiers.includes(movimientoPedidoIdentifier)) {
          return false;
        }
        movimientoPedidoCollectionIdentifiers.push(movimientoPedidoIdentifier);
        return true;
      });
      return [...movimientoPedidosToAdd, ...movimientoPedidoCollection];
    }
    return movimientoPedidoCollection;
  }
}
