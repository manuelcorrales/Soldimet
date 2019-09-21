import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEmpleado } from 'app/shared/model/empleado.model';

type EntityResponseType = HttpResponse<IEmpleado>;
type EntityArrayResponseType = HttpResponse<IEmpleado[]>;

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  public resourceUrl = SERVER_API_URL + 'api/empleados';

  constructor(protected http: HttpClient) {}

  create(empleado: IEmpleado): Observable<EntityResponseType> {
    return this.http.post<IEmpleado>(this.resourceUrl, empleado, { observe: 'response' });
  }

  update(empleado: IEmpleado): Observable<EntityResponseType> {
    return this.http.put<IEmpleado>(this.resourceUrl, empleado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
