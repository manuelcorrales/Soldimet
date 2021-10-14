import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICostoRepuestoProveedor, getCostoRepuestoProveedorIdentifier } from '../costo-repuesto-proveedor.model';

export type EntityResponseType = HttpResponse<ICostoRepuestoProveedor>;
export type EntityArrayResponseType = HttpResponse<ICostoRepuestoProveedor[]>;

@Injectable({ providedIn: 'root' })
export class CostoRepuestoProveedorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/costo-repuesto-proveedors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(costoRepuestoProveedor: ICostoRepuestoProveedor): Observable<EntityResponseType> {
    return this.http.post<ICostoRepuestoProveedor>(this.resourceUrl, costoRepuestoProveedor, { observe: 'response' });
  }

  update(costoRepuestoProveedor: ICostoRepuestoProveedor): Observable<EntityResponseType> {
    return this.http.put<ICostoRepuestoProveedor>(
      `${this.resourceUrl}/${getCostoRepuestoProveedorIdentifier(costoRepuestoProveedor) as number}`,
      costoRepuestoProveedor,
      { observe: 'response' }
    );
  }

  partialUpdate(costoRepuestoProveedor: ICostoRepuestoProveedor): Observable<EntityResponseType> {
    return this.http.patch<ICostoRepuestoProveedor>(
      `${this.resourceUrl}/${getCostoRepuestoProveedorIdentifier(costoRepuestoProveedor) as number}`,
      costoRepuestoProveedor,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICostoRepuestoProveedor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICostoRepuestoProveedor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCostoRepuestoProveedorToCollectionIfMissing(
    costoRepuestoProveedorCollection: ICostoRepuestoProveedor[],
    ...costoRepuestoProveedorsToCheck: (ICostoRepuestoProveedor | null | undefined)[]
  ): ICostoRepuestoProveedor[] {
    const costoRepuestoProveedors: ICostoRepuestoProveedor[] = costoRepuestoProveedorsToCheck.filter(isPresent);
    if (costoRepuestoProveedors.length > 0) {
      const costoRepuestoProveedorCollectionIdentifiers = costoRepuestoProveedorCollection.map(
        costoRepuestoProveedorItem => getCostoRepuestoProveedorIdentifier(costoRepuestoProveedorItem)!
      );
      const costoRepuestoProveedorsToAdd = costoRepuestoProveedors.filter(costoRepuestoProveedorItem => {
        const costoRepuestoProveedorIdentifier = getCostoRepuestoProveedorIdentifier(costoRepuestoProveedorItem);
        if (
          costoRepuestoProveedorIdentifier == null ||
          costoRepuestoProveedorCollectionIdentifiers.includes(costoRepuestoProveedorIdentifier)
        ) {
          return false;
        }
        costoRepuestoProveedorCollectionIdentifiers.push(costoRepuestoProveedorIdentifier);
        return true;
      });
      return [...costoRepuestoProveedorsToAdd, ...costoRepuestoProveedorCollection];
    }
    return costoRepuestoProveedorCollection;
  }
}
