import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEstadoCostoRepuesto, getEstadoCostoRepuestoIdentifier } from '../estado-costo-repuesto.model';

export type EntityResponseType = HttpResponse<IEstadoCostoRepuesto>;
export type EntityArrayResponseType = HttpResponse<IEstadoCostoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class EstadoCostoRepuestoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/estado-costo-repuestos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(estadoCostoRepuesto: IEstadoCostoRepuesto): Observable<EntityResponseType> {
    return this.http.post<IEstadoCostoRepuesto>(this.resourceUrl, estadoCostoRepuesto, { observe: 'response' });
  }

  update(estadoCostoRepuesto: IEstadoCostoRepuesto): Observable<EntityResponseType> {
    return this.http.put<IEstadoCostoRepuesto>(
      `${this.resourceUrl}/${getEstadoCostoRepuestoIdentifier(estadoCostoRepuesto) as number}`,
      estadoCostoRepuesto,
      { observe: 'response' }
    );
  }

  partialUpdate(estadoCostoRepuesto: IEstadoCostoRepuesto): Observable<EntityResponseType> {
    return this.http.patch<IEstadoCostoRepuesto>(
      `${this.resourceUrl}/${getEstadoCostoRepuestoIdentifier(estadoCostoRepuesto) as number}`,
      estadoCostoRepuesto,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstadoCostoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstadoCostoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEstadoCostoRepuestoToCollectionIfMissing(
    estadoCostoRepuestoCollection: IEstadoCostoRepuesto[],
    ...estadoCostoRepuestosToCheck: (IEstadoCostoRepuesto | null | undefined)[]
  ): IEstadoCostoRepuesto[] {
    const estadoCostoRepuestos: IEstadoCostoRepuesto[] = estadoCostoRepuestosToCheck.filter(isPresent);
    if (estadoCostoRepuestos.length > 0) {
      const estadoCostoRepuestoCollectionIdentifiers = estadoCostoRepuestoCollection.map(
        estadoCostoRepuestoItem => getEstadoCostoRepuestoIdentifier(estadoCostoRepuestoItem)!
      );
      const estadoCostoRepuestosToAdd = estadoCostoRepuestos.filter(estadoCostoRepuestoItem => {
        const estadoCostoRepuestoIdentifier = getEstadoCostoRepuestoIdentifier(estadoCostoRepuestoItem);
        if (estadoCostoRepuestoIdentifier == null || estadoCostoRepuestoCollectionIdentifiers.includes(estadoCostoRepuestoIdentifier)) {
          return false;
        }
        estadoCostoRepuestoCollectionIdentifiers.push(estadoCostoRepuestoIdentifier);
        return true;
      });
      return [...estadoCostoRepuestosToAdd, ...estadoCostoRepuestoCollection];
    }
    return estadoCostoRepuestoCollection;
  }
}
