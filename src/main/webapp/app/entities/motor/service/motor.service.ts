import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMotor, getMotorIdentifier } from '../motor.model';

export type EntityResponseType = HttpResponse<IMotor>;
export type EntityArrayResponseType = HttpResponse<IMotor[]>;

@Injectable({ providedIn: 'root' })
export class MotorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/motors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(motor: IMotor): Observable<EntityResponseType> {
    return this.http.post<IMotor>(this.resourceUrl, motor, { observe: 'response' });
  }

  update(motor: IMotor): Observable<EntityResponseType> {
    return this.http.put<IMotor>(`${this.resourceUrl}/${getMotorIdentifier(motor) as number}`, motor, { observe: 'response' });
  }

  partialUpdate(motor: IMotor): Observable<EntityResponseType> {
    return this.http.patch<IMotor>(`${this.resourceUrl}/${getMotorIdentifier(motor) as number}`, motor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMotorToCollectionIfMissing(motorCollection: IMotor[], ...motorsToCheck: (IMotor | null | undefined)[]): IMotor[] {
    const motors: IMotor[] = motorsToCheck.filter(isPresent);
    if (motors.length > 0) {
      const motorCollectionIdentifiers = motorCollection.map(motorItem => getMotorIdentifier(motorItem)!);
      const motorsToAdd = motors.filter(motorItem => {
        const motorIdentifier = getMotorIdentifier(motorItem);
        if (motorIdentifier == null || motorCollectionIdentifiers.includes(motorIdentifier)) {
          return false;
        }
        motorCollectionIdentifiers.push(motorIdentifier);
        return true;
      });
      return [...motorsToAdd, ...motorCollection];
    }
    return motorCollection;
  }
}
