import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMotor } from 'app/shared/model/motor.model';

type EntityResponseType = HttpResponse<IMotor>;
type EntityArrayResponseType = HttpResponse<IMotor[]>;

@Injectable({ providedIn: 'root' })
export class MotorService {
  public resourceUrl = SERVER_API_URL + 'api/motors';

  constructor(protected http: HttpClient) {}

  create(motor: IMotor): Observable<EntityResponseType> {
    return this.http.post<IMotor>(this.resourceUrl, motor, { observe: 'response' });
  }

  update(motor: IMotor): Observable<EntityResponseType> {
    return this.http.put<IMotor>(this.resourceUrl, motor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
