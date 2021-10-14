import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IArticulo, getArticuloIdentifier } from '../articulo.model';

export type EntityResponseType = HttpResponse<IArticulo>;
export type EntityArrayResponseType = HttpResponse<IArticulo[]>;

@Injectable({ providedIn: 'root' })
export class ArticuloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/articulos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(articulo: IArticulo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(articulo);
    return this.http
      .post<IArticulo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(articulo: IArticulo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(articulo);
    return this.http
      .put<IArticulo>(`${this.resourceUrl}/${getArticuloIdentifier(articulo) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(articulo: IArticulo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(articulo);
    return this.http
      .patch<IArticulo>(`${this.resourceUrl}/${getArticuloIdentifier(articulo) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArticulo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArticulo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addArticuloToCollectionIfMissing(articuloCollection: IArticulo[], ...articulosToCheck: (IArticulo | null | undefined)[]): IArticulo[] {
    const articulos: IArticulo[] = articulosToCheck.filter(isPresent);
    if (articulos.length > 0) {
      const articuloCollectionIdentifiers = articuloCollection.map(articuloItem => getArticuloIdentifier(articuloItem)!);
      const articulosToAdd = articulos.filter(articuloItem => {
        const articuloIdentifier = getArticuloIdentifier(articuloItem);
        if (articuloIdentifier == null || articuloCollectionIdentifiers.includes(articuloIdentifier)) {
          return false;
        }
        articuloCollectionIdentifiers.push(articuloIdentifier);
        return true;
      });
      return [...articulosToAdd, ...articuloCollection];
    }
    return articuloCollection;
  }

  protected convertDateFromClient(articulo: IArticulo): IArticulo {
    return Object.assign({}, articulo, {
      fechaCosto: articulo.fechaCosto?.isValid() ? articulo.fechaCosto.format(DATE_FORMAT) : undefined,
      fechaCostoProveedor: articulo.fechaCostoProveedor?.isValid() ? articulo.fechaCostoProveedor.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCosto = res.body.fechaCosto ? dayjs(res.body.fechaCosto) : undefined;
      res.body.fechaCostoProveedor = res.body.fechaCostoProveedor ? dayjs(res.body.fechaCostoProveedor) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((articulo: IArticulo) => {
        articulo.fechaCosto = articulo.fechaCosto ? dayjs(articulo.fechaCosto) : undefined;
        articulo.fechaCostoProveedor = articulo.fechaCostoProveedor ? dayjs(articulo.fechaCostoProveedor) : undefined;
      });
    }
    return res;
  }
}
