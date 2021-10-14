import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPrecioRepuesto, getPrecioRepuestoIdentifier } from '../precio-repuesto.model';

export type EntityResponseType = HttpResponse<IPrecioRepuesto>;
export type EntityArrayResponseType = HttpResponse<IPrecioRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class PrecioRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/precio-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(precioRepuesto: IPrecioRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(precioRepuesto);
    return this.http
      .post<IPrecioRepuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(precioRepuesto: IPrecioRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(precioRepuesto);
    return this.http
      .put<IPrecioRepuesto>(`${this.resourceUrl}/${getPrecioRepuestoIdentifier(precioRepuesto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(precioRepuesto: IPrecioRepuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(precioRepuesto);
    return this.http
      .patch<IPrecioRepuesto>(`${this.resourceUrl}/${getPrecioRepuestoIdentifier(precioRepuesto) as number}`, copy, { observe: 'response' })
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPrecioRepuestoToCollectionIfMissing(
    precioRepuestoCollection: IPrecioRepuesto[],
    ...precioRepuestosToCheck: (IPrecioRepuesto | null | undefined)[]
  ): IPrecioRepuesto[] {
    const precioRepuestos: IPrecioRepuesto[] = precioRepuestosToCheck.filter(isPresent);
    if (precioRepuestos.length > 0) {
      const precioRepuestoCollectionIdentifiers = precioRepuestoCollection.map(
        precioRepuestoItem => getPrecioRepuestoIdentifier(precioRepuestoItem)!
      );
      const precioRepuestosToAdd = precioRepuestos.filter(precioRepuestoItem => {
        const precioRepuestoIdentifier = getPrecioRepuestoIdentifier(precioRepuestoItem);
        if (precioRepuestoIdentifier == null || precioRepuestoCollectionIdentifiers.includes(precioRepuestoIdentifier)) {
          return false;
        }
        precioRepuestoCollectionIdentifiers.push(precioRepuestoIdentifier);
        return true;
      });
      return [...precioRepuestosToAdd, ...precioRepuestoCollection];
    }
    return precioRepuestoCollection;
  }

  protected convertDateFromClient(precioRepuesto: IPrecioRepuesto): IPrecioRepuesto {
    return Object.assign({}, precioRepuesto, {
      fecha: precioRepuesto.fecha?.isValid() ? precioRepuesto.fecha.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((precioRepuesto: IPrecioRepuesto) => {
        precioRepuesto.fecha = precioRepuesto.fecha ? dayjs(precioRepuesto.fecha) : undefined;
      });
    }
    return res;
  }
}
