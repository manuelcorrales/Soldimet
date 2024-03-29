import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser } from 'app/core/user/user.model';
import { DtoEmpleado } from 'app/dto/dto-empleado/dto-empleado.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';
  private empleadoResourceUrl = SERVER_API_URL + '/api/empleado';
  private resetPasswordUrl = SERVER_API_URL + 'api/account/reset-password/init-link';

  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: IUser): Observable<HttpResponse<IUser>> {
    return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  find(login: string): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }

  getCurrentEmpleado(): Observable<DtoEmpleado> {
    return this.http.get<DtoEmpleado>(this.empleadoResourceUrl + '/getEmpleadoActual');
  }

  resetPassword(user: IUser): Observable<{ response: String }> {
    return this.http.post<{ response: String }>(this.resetPasswordUrl, user.email);
  }
}
