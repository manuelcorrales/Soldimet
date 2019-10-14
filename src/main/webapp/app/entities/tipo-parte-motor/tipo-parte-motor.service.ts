import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

type EntityResponseType = HttpResponse<ITipoParteMotor>;
type EntityArrayResponseType = HttpResponse<ITipoParteMotor[]>;

@Injectable({ providedIn: 'root' })
export class TipoParteMotorService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-parte-motors';

  constructor(protected http: HttpClient) {}

  create(tipoParteMotor: ITipoParteMotor): Observable<EntityResponseType> {
    return this.http.post<ITipoParteMotor>(this.resourceUrl, tipoParteMotor, { observe: 'response' });
  }

  update(tipoParteMotor: ITipoParteMotor): Observable<EntityResponseType> {
    return this.http.put<ITipoParteMotor>(this.resourceUrl, tipoParteMotor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoParteMotor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoParteMotor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
