import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

type EntityResponseType = HttpResponse<ICostoRepuestoProveedor>;
type EntityArrayResponseType = HttpResponse<ICostoRepuestoProveedor[]>;

@Injectable({ providedIn: 'root' })
export class CostoRepuestoProveedorService {
  public resourceUrl = SERVER_API_URL + 'api/costo-repuesto-proveedors';

  constructor(protected http: HttpClient) {}

  create(costoRepuestoProveedor: ICostoRepuestoProveedor): Observable<EntityResponseType> {
    return this.http.post<ICostoRepuestoProveedor>(this.resourceUrl, costoRepuestoProveedor, { observe: 'response' });
  }

  update(costoRepuestoProveedor: ICostoRepuestoProveedor): Observable<EntityResponseType> {
    return this.http.put<ICostoRepuestoProveedor>(this.resourceUrl, costoRepuestoProveedor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICostoRepuestoProveedor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICostoRepuestoProveedor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
