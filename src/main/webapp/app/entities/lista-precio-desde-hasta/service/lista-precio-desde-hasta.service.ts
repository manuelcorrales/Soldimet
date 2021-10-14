import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IListaPrecioDesdeHasta, getListaPrecioDesdeHastaIdentifier } from '../lista-precio-desde-hasta.model';

export type EntityResponseType = HttpResponse<IListaPrecioDesdeHasta>;
export type EntityArrayResponseType = HttpResponse<IListaPrecioDesdeHasta[]>;

@Injectable({ providedIn: 'root' })
export class ListaPrecioDesdeHastaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lista-precio-desde-hastas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(listaPrecioDesdeHasta);
    return this.http
      .post<IListaPrecioDesdeHasta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(listaPrecioDesdeHasta);
    return this.http
      .put<IListaPrecioDesdeHasta>(`${this.resourceUrl}/${getListaPrecioDesdeHastaIdentifier(listaPrecioDesdeHasta) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(listaPrecioDesdeHasta);
    return this.http
      .patch<IListaPrecioDesdeHasta>(`${this.resourceUrl}/${getListaPrecioDesdeHastaIdentifier(listaPrecioDesdeHasta) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IListaPrecioDesdeHasta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IListaPrecioDesdeHasta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addListaPrecioDesdeHastaToCollectionIfMissing(
    listaPrecioDesdeHastaCollection: IListaPrecioDesdeHasta[],
    ...listaPrecioDesdeHastasToCheck: (IListaPrecioDesdeHasta | null | undefined)[]
  ): IListaPrecioDesdeHasta[] {
    const listaPrecioDesdeHastas: IListaPrecioDesdeHasta[] = listaPrecioDesdeHastasToCheck.filter(isPresent);
    if (listaPrecioDesdeHastas.length > 0) {
      const listaPrecioDesdeHastaCollectionIdentifiers = listaPrecioDesdeHastaCollection.map(
        listaPrecioDesdeHastaItem => getListaPrecioDesdeHastaIdentifier(listaPrecioDesdeHastaItem)!
      );
      const listaPrecioDesdeHastasToAdd = listaPrecioDesdeHastas.filter(listaPrecioDesdeHastaItem => {
        const listaPrecioDesdeHastaIdentifier = getListaPrecioDesdeHastaIdentifier(listaPrecioDesdeHastaItem);
        if (
          listaPrecioDesdeHastaIdentifier == null ||
          listaPrecioDesdeHastaCollectionIdentifiers.includes(listaPrecioDesdeHastaIdentifier)
        ) {
          return false;
        }
        listaPrecioDesdeHastaCollectionIdentifiers.push(listaPrecioDesdeHastaIdentifier);
        return true;
      });
      return [...listaPrecioDesdeHastasToAdd, ...listaPrecioDesdeHastaCollection];
    }
    return listaPrecioDesdeHastaCollection;
  }

  protected convertDateFromClient(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): IListaPrecioDesdeHasta {
    return Object.assign({}, listaPrecioDesdeHasta, {
      fechaDesde: listaPrecioDesdeHasta.fechaDesde?.isValid() ? listaPrecioDesdeHasta.fechaDesde.format(DATE_FORMAT) : undefined,
      fechaHasta: listaPrecioDesdeHasta.fechaHasta?.isValid() ? listaPrecioDesdeHasta.fechaHasta.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDesde = res.body.fechaDesde ? dayjs(res.body.fechaDesde) : undefined;
      res.body.fechaHasta = res.body.fechaHasta ? dayjs(res.body.fechaHasta) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((listaPrecioDesdeHasta: IListaPrecioDesdeHasta) => {
        listaPrecioDesdeHasta.fechaDesde = listaPrecioDesdeHasta.fechaDesde ? dayjs(listaPrecioDesdeHasta.fechaDesde) : undefined;
        listaPrecioDesdeHasta.fechaHasta = listaPrecioDesdeHasta.fechaHasta ? dayjs(listaPrecioDesdeHasta.fechaHasta) : undefined;
      });
    }
    return res;
  }
}
