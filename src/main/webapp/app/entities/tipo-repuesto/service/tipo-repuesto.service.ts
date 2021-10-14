import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoRepuesto, getTipoRepuestoIdentifier } from '../tipo-repuesto.model';

export type EntityResponseType = HttpResponse<ITipoRepuesto>;
export type EntityArrayResponseType = HttpResponse<ITipoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class TipoRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoRepuesto: ITipoRepuesto): Observable<EntityResponseType> {
    return this.http.post<ITipoRepuesto>(this.resourceUrl, tipoRepuesto, { observe: 'response' });
  }

  update(tipoRepuesto: ITipoRepuesto): Observable<EntityResponseType> {
    return this.http.put<ITipoRepuesto>(`${this.resourceUrl}/${getTipoRepuestoIdentifier(tipoRepuesto) as number}`, tipoRepuesto, {
      observe: 'response',
    });
  }

  partialUpdate(tipoRepuesto: ITipoRepuesto): Observable<EntityResponseType> {
    return this.http.patch<ITipoRepuesto>(`${this.resourceUrl}/${getTipoRepuestoIdentifier(tipoRepuesto) as number}`, tipoRepuesto, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoRepuestoToCollectionIfMissing(
    tipoRepuestoCollection: ITipoRepuesto[],
    ...tipoRepuestosToCheck: (ITipoRepuesto | null | undefined)[]
  ): ITipoRepuesto[] {
    const tipoRepuestos: ITipoRepuesto[] = tipoRepuestosToCheck.filter(isPresent);
    if (tipoRepuestos.length > 0) {
      const tipoRepuestoCollectionIdentifiers = tipoRepuestoCollection.map(
        tipoRepuestoItem => getTipoRepuestoIdentifier(tipoRepuestoItem)!
      );
      const tipoRepuestosToAdd = tipoRepuestos.filter(tipoRepuestoItem => {
        const tipoRepuestoIdentifier = getTipoRepuestoIdentifier(tipoRepuestoItem);
        if (tipoRepuestoIdentifier == null || tipoRepuestoCollectionIdentifiers.includes(tipoRepuestoIdentifier)) {
          return false;
        }
        tipoRepuestoCollectionIdentifiers.push(tipoRepuestoIdentifier);
        return true;
      });
      return [...tipoRepuestosToAdd, ...tipoRepuestoCollection];
    }
    return tipoRepuestoCollection;
  }
}
