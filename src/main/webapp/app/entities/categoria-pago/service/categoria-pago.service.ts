import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategoriaPago, getCategoriaPagoIdentifier } from '../categoria-pago.model';

export type EntityResponseType = HttpResponse<ICategoriaPago>;
export type EntityArrayResponseType = HttpResponse<ICategoriaPago[]>;

@Injectable({ providedIn: 'root' })
export class CategoriaPagoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categoria-pagos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(categoriaPago: ICategoriaPago): Observable<EntityResponseType> {
    return this.http.post<ICategoriaPago>(this.resourceUrl, categoriaPago, { observe: 'response' });
  }

  update(categoriaPago: ICategoriaPago): Observable<EntityResponseType> {
    return this.http.put<ICategoriaPago>(`${this.resourceUrl}/${getCategoriaPagoIdentifier(categoriaPago) as number}`, categoriaPago, {
      observe: 'response',
    });
  }

  partialUpdate(categoriaPago: ICategoriaPago): Observable<EntityResponseType> {
    return this.http.patch<ICategoriaPago>(`${this.resourceUrl}/${getCategoriaPagoIdentifier(categoriaPago) as number}`, categoriaPago, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoriaPago>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoriaPago[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCategoriaPagoToCollectionIfMissing(
    categoriaPagoCollection: ICategoriaPago[],
    ...categoriaPagosToCheck: (ICategoriaPago | null | undefined)[]
  ): ICategoriaPago[] {
    const categoriaPagos: ICategoriaPago[] = categoriaPagosToCheck.filter(isPresent);
    if (categoriaPagos.length > 0) {
      const categoriaPagoCollectionIdentifiers = categoriaPagoCollection.map(
        categoriaPagoItem => getCategoriaPagoIdentifier(categoriaPagoItem)!
      );
      const categoriaPagosToAdd = categoriaPagos.filter(categoriaPagoItem => {
        const categoriaPagoIdentifier = getCategoriaPagoIdentifier(categoriaPagoItem);
        if (categoriaPagoIdentifier == null || categoriaPagoCollectionIdentifiers.includes(categoriaPagoIdentifier)) {
          return false;
        }
        categoriaPagoCollectionIdentifiers.push(categoriaPagoIdentifier);
        return true;
      });
      return [...categoriaPagosToAdd, ...categoriaPagoCollection];
    }
    return categoriaPagoCollection;
  }
}
