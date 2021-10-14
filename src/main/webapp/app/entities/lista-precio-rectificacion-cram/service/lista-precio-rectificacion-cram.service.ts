import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IListaPrecioRectificacionCRAM, getListaPrecioRectificacionCRAMIdentifier } from '../lista-precio-rectificacion-cram.model';

export type EntityResponseType = HttpResponse<IListaPrecioRectificacionCRAM>;
export type EntityArrayResponseType = HttpResponse<IListaPrecioRectificacionCRAM[]>;

@Injectable({ providedIn: 'root' })
export class ListaPrecioRectificacionCRAMService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lista-precio-rectificacion-crams');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
    return this.http.post<IListaPrecioRectificacionCRAM>(this.resourceUrl, listaPrecioRectificacionCRAM, { observe: 'response' });
  }

  update(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
    return this.http.put<IListaPrecioRectificacionCRAM>(
      `${this.resourceUrl}/${getListaPrecioRectificacionCRAMIdentifier(listaPrecioRectificacionCRAM) as number}`,
      listaPrecioRectificacionCRAM,
      { observe: 'response' }
    );
  }

  partialUpdate(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): Observable<EntityResponseType> {
    return this.http.patch<IListaPrecioRectificacionCRAM>(
      `${this.resourceUrl}/${getListaPrecioRectificacionCRAMIdentifier(listaPrecioRectificacionCRAM) as number}`,
      listaPrecioRectificacionCRAM,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IListaPrecioRectificacionCRAM>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IListaPrecioRectificacionCRAM[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addListaPrecioRectificacionCRAMToCollectionIfMissing(
    listaPrecioRectificacionCRAMCollection: IListaPrecioRectificacionCRAM[],
    ...listaPrecioRectificacionCRAMSToCheck: (IListaPrecioRectificacionCRAM | null | undefined)[]
  ): IListaPrecioRectificacionCRAM[] {
    const listaPrecioRectificacionCRAMS: IListaPrecioRectificacionCRAM[] = listaPrecioRectificacionCRAMSToCheck.filter(isPresent);
    if (listaPrecioRectificacionCRAMS.length > 0) {
      const listaPrecioRectificacionCRAMCollectionIdentifiers = listaPrecioRectificacionCRAMCollection.map(
        listaPrecioRectificacionCRAMItem => getListaPrecioRectificacionCRAMIdentifier(listaPrecioRectificacionCRAMItem)!
      );
      const listaPrecioRectificacionCRAMSToAdd = listaPrecioRectificacionCRAMS.filter(listaPrecioRectificacionCRAMItem => {
        const listaPrecioRectificacionCRAMIdentifier = getListaPrecioRectificacionCRAMIdentifier(listaPrecioRectificacionCRAMItem);
        if (
          listaPrecioRectificacionCRAMIdentifier == null ||
          listaPrecioRectificacionCRAMCollectionIdentifiers.includes(listaPrecioRectificacionCRAMIdentifier)
        ) {
          return false;
        }
        listaPrecioRectificacionCRAMCollectionIdentifiers.push(listaPrecioRectificacionCRAMIdentifier);
        return true;
      });
      return [...listaPrecioRectificacionCRAMSToAdd, ...listaPrecioRectificacionCRAMCollection];
    }
    return listaPrecioRectificacionCRAMCollection;
  }
}
