import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPresupuesto, getPresupuestoIdentifier } from '../presupuesto.model';

export type EntityResponseType = HttpResponse<IPresupuesto>;
export type EntityArrayResponseType = HttpResponse<IPresupuesto[]>;

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/presupuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(presupuesto: IPresupuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presupuesto);
    return this.http
      .post<IPresupuesto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(presupuesto: IPresupuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presupuesto);
    return this.http
      .put<IPresupuesto>(`${this.resourceUrl}/${getPresupuestoIdentifier(presupuesto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(presupuesto: IPresupuesto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presupuesto);
    return this.http
      .patch<IPresupuesto>(`${this.resourceUrl}/${getPresupuestoIdentifier(presupuesto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPresupuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPresupuesto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPresupuestoToCollectionIfMissing(
    presupuestoCollection: IPresupuesto[],
    ...presupuestosToCheck: (IPresupuesto | null | undefined)[]
  ): IPresupuesto[] {
    const presupuestos: IPresupuesto[] = presupuestosToCheck.filter(isPresent);
    if (presupuestos.length > 0) {
      const presupuestoCollectionIdentifiers = presupuestoCollection.map(presupuestoItem => getPresupuestoIdentifier(presupuestoItem)!);
      const presupuestosToAdd = presupuestos.filter(presupuestoItem => {
        const presupuestoIdentifier = getPresupuestoIdentifier(presupuestoItem);
        if (presupuestoIdentifier == null || presupuestoCollectionIdentifiers.includes(presupuestoIdentifier)) {
          return false;
        }
        presupuestoCollectionIdentifiers.push(presupuestoIdentifier);
        return true;
      });
      return [...presupuestosToAdd, ...presupuestoCollection];
    }
    return presupuestoCollection;
  }

  protected convertDateFromClient(presupuesto: IPresupuesto): IPresupuesto {
    return Object.assign({}, presupuesto, {
      fechaCreacion: presupuesto.fechaCreacion?.isValid() ? presupuesto.fechaCreacion.format(DATE_FORMAT) : undefined,
      fechaAceptado: presupuesto.fechaAceptado?.isValid() ? presupuesto.fechaAceptado.format(DATE_FORMAT) : undefined,
      fechaEntregado: presupuesto.fechaEntregado?.isValid() ? presupuesto.fechaEntregado.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacion = res.body.fechaCreacion ? dayjs(res.body.fechaCreacion) : undefined;
      res.body.fechaAceptado = res.body.fechaAceptado ? dayjs(res.body.fechaAceptado) : undefined;
      res.body.fechaEntregado = res.body.fechaEntregado ? dayjs(res.body.fechaEntregado) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((presupuesto: IPresupuesto) => {
        presupuesto.fechaCreacion = presupuesto.fechaCreacion ? dayjs(presupuesto.fechaCreacion) : undefined;
        presupuesto.fechaAceptado = presupuesto.fechaAceptado ? dayjs(presupuesto.fechaAceptado) : undefined;
        presupuesto.fechaEntregado = presupuesto.fechaEntregado ? dayjs(presupuesto.fechaEntregado) : undefined;
      });
    }
    return res;
  }
}
