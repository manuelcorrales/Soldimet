import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoParteMotor, getTipoParteMotorIdentifier } from '../tipo-parte-motor.model';

export type EntityResponseType = HttpResponse<ITipoParteMotor>;
export type EntityArrayResponseType = HttpResponse<ITipoParteMotor[]>;

@Injectable({ providedIn: 'root' })
export class TipoParteMotorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-parte-motors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tipoParteMotor: ITipoParteMotor): Observable<EntityResponseType> {
    return this.http.post<ITipoParteMotor>(this.resourceUrl, tipoParteMotor, { observe: 'response' });
  }

  update(tipoParteMotor: ITipoParteMotor): Observable<EntityResponseType> {
    return this.http.put<ITipoParteMotor>(`${this.resourceUrl}/${getTipoParteMotorIdentifier(tipoParteMotor) as number}`, tipoParteMotor, {
      observe: 'response',
    });
  }

  partialUpdate(tipoParteMotor: ITipoParteMotor): Observable<EntityResponseType> {
    return this.http.patch<ITipoParteMotor>(
      `${this.resourceUrl}/${getTipoParteMotorIdentifier(tipoParteMotor) as number}`,
      tipoParteMotor,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoParteMotor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoParteMotor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTipoParteMotorToCollectionIfMissing(
    tipoParteMotorCollection: ITipoParteMotor[],
    ...tipoParteMotorsToCheck: (ITipoParteMotor | null | undefined)[]
  ): ITipoParteMotor[] {
    const tipoParteMotors: ITipoParteMotor[] = tipoParteMotorsToCheck.filter(isPresent);
    if (tipoParteMotors.length > 0) {
      const tipoParteMotorCollectionIdentifiers = tipoParteMotorCollection.map(
        tipoParteMotorItem => getTipoParteMotorIdentifier(tipoParteMotorItem)!
      );
      const tipoParteMotorsToAdd = tipoParteMotors.filter(tipoParteMotorItem => {
        const tipoParteMotorIdentifier = getTipoParteMotorIdentifier(tipoParteMotorItem);
        if (tipoParteMotorIdentifier == null || tipoParteMotorCollectionIdentifiers.includes(tipoParteMotorIdentifier)) {
          return false;
        }
        tipoParteMotorCollectionIdentifiers.push(tipoParteMotorIdentifier);
        return true;
      });
      return [...tipoParteMotorsToAdd, ...tipoParteMotorCollection];
    }
    return tipoParteMotorCollection;
  }
}
