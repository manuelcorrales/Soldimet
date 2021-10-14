import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICostoRepuesto, getCostoRepuestoIdentifier } from '../costo-repuesto.model';

export type EntityResponseType = HttpResponse<ICostoRepuesto>;
export type EntityArrayResponseType = HttpResponse<ICostoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class CostoRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/costo-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(costoRepuesto: ICostoRepuesto): Observable<EntityResponseType> {
    return this.http.post<ICostoRepuesto>(this.resourceUrl, costoRepuesto, { observe: 'response' });
  }

  update(costoRepuesto: ICostoRepuesto): Observable<EntityResponseType> {
    return this.http.put<ICostoRepuesto>(`${this.resourceUrl}/${getCostoRepuestoIdentifier(costoRepuesto) as number}`, costoRepuesto, {
      observe: 'response',
    });
  }

  partialUpdate(costoRepuesto: ICostoRepuesto): Observable<EntityResponseType> {
    return this.http.patch<ICostoRepuesto>(`${this.resourceUrl}/${getCostoRepuestoIdentifier(costoRepuesto) as number}`, costoRepuesto, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICostoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICostoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCostoRepuestoToCollectionIfMissing(
    costoRepuestoCollection: ICostoRepuesto[],
    ...costoRepuestosToCheck: (ICostoRepuesto | null | undefined)[]
  ): ICostoRepuesto[] {
    const costoRepuestos: ICostoRepuesto[] = costoRepuestosToCheck.filter(isPresent);
    if (costoRepuestos.length > 0) {
      const costoRepuestoCollectionIdentifiers = costoRepuestoCollection.map(
        costoRepuestoItem => getCostoRepuestoIdentifier(costoRepuestoItem)!
      );
      const costoRepuestosToAdd = costoRepuestos.filter(costoRepuestoItem => {
        const costoRepuestoIdentifier = getCostoRepuestoIdentifier(costoRepuestoItem);
        if (costoRepuestoIdentifier == null || costoRepuestoCollectionIdentifiers.includes(costoRepuestoIdentifier)) {
          return false;
        }
        costoRepuestoCollectionIdentifiers.push(costoRepuestoIdentifier);
        return true;
      });
      return [...costoRepuestosToAdd, ...costoRepuestoCollection];
    }
    return costoRepuestoCollection;
  }
}
