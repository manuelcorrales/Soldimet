import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimiento, getMovimientoIdentifier } from '../movimiento.model';

export type EntityResponseType = HttpResponse<IMovimiento>;
export type EntityArrayResponseType = HttpResponse<IMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimiento: IMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimiento);
    return this.http
      .post<IMovimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimiento: IMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimiento);
    return this.http
      .put<IMovimiento>(`${this.resourceUrl}/${getMovimientoIdentifier(movimiento) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(movimiento: IMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimiento);
    return this.http
      .patch<IMovimiento>(`${this.resourceUrl}/${getMovimientoIdentifier(movimiento) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientoToCollectionIfMissing(
    movimientoCollection: IMovimiento[],
    ...movimientosToCheck: (IMovimiento | null | undefined)[]
  ): IMovimiento[] {
    const movimientos: IMovimiento[] = movimientosToCheck.filter(isPresent);
    if (movimientos.length > 0) {
      const movimientoCollectionIdentifiers = movimientoCollection.map(movimientoItem => getMovimientoIdentifier(movimientoItem)!);
      const movimientosToAdd = movimientos.filter(movimientoItem => {
        const movimientoIdentifier = getMovimientoIdentifier(movimientoItem);
        if (movimientoIdentifier == null || movimientoCollectionIdentifiers.includes(movimientoIdentifier)) {
          return false;
        }
        movimientoCollectionIdentifiers.push(movimientoIdentifier);
        return true;
      });
      return [...movimientosToAdd, ...movimientoCollection];
    }
    return movimientoCollection;
  }

  protected convertDateFromClient(movimiento: IMovimiento): IMovimiento {
    return Object.assign({}, movimiento, {
      fecha: movimiento.fecha?.isValid() ? movimiento.fecha.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((movimiento: IMovimiento) => {
        movimiento.fecha = movimiento.fecha ? dayjs(movimiento.fecha) : undefined;
      });
    }
    return res;
  }
}
