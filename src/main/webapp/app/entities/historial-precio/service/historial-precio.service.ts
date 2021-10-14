import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistorialPrecio, getHistorialPrecioIdentifier } from '../historial-precio.model';

export type EntityResponseType = HttpResponse<IHistorialPrecio>;
export type EntityArrayResponseType = HttpResponse<IHistorialPrecio[]>;

@Injectable({ providedIn: 'root' })
export class HistorialPrecioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/historial-precios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(historialPrecio: IHistorialPrecio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historialPrecio);
    return this.http
      .post<IHistorialPrecio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historialPrecio: IHistorialPrecio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historialPrecio);
    return this.http
      .put<IHistorialPrecio>(`${this.resourceUrl}/${getHistorialPrecioIdentifier(historialPrecio) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(historialPrecio: IHistorialPrecio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historialPrecio);
    return this.http
      .patch<IHistorialPrecio>(`${this.resourceUrl}/${getHistorialPrecioIdentifier(historialPrecio) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistorialPrecio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistorialPrecio[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHistorialPrecioToCollectionIfMissing(
    historialPrecioCollection: IHistorialPrecio[],
    ...historialPreciosToCheck: (IHistorialPrecio | null | undefined)[]
  ): IHistorialPrecio[] {
    const historialPrecios: IHistorialPrecio[] = historialPreciosToCheck.filter(isPresent);
    if (historialPrecios.length > 0) {
      const historialPrecioCollectionIdentifiers = historialPrecioCollection.map(
        historialPrecioItem => getHistorialPrecioIdentifier(historialPrecioItem)!
      );
      const historialPreciosToAdd = historialPrecios.filter(historialPrecioItem => {
        const historialPrecioIdentifier = getHistorialPrecioIdentifier(historialPrecioItem);
        if (historialPrecioIdentifier == null || historialPrecioCollectionIdentifiers.includes(historialPrecioIdentifier)) {
          return false;
        }
        historialPrecioCollectionIdentifiers.push(historialPrecioIdentifier);
        return true;
      });
      return [...historialPreciosToAdd, ...historialPrecioCollection];
    }
    return historialPrecioCollection;
  }

  protected convertDateFromClient(historialPrecio: IHistorialPrecio): IHistorialPrecio {
    return Object.assign({}, historialPrecio, {
      fechaHistorial: historialPrecio.fechaHistorial?.isValid() ? historialPrecio.fechaHistorial.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaHistorial = res.body.fechaHistorial ? dayjs(res.body.fechaHistorial) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historialPrecio: IHistorialPrecio) => {
        historialPrecio.fechaHistorial = historialPrecio.fechaHistorial ? dayjs(historialPrecio.fechaHistorial) : undefined;
      });
    }
    return res;
  }
}
