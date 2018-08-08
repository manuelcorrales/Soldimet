import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

type EntityResponseType = HttpResponse<ITipoRepuesto>;
type EntityArrayResponseType = HttpResponse<ITipoRepuesto[]>;

@Injectable({ providedIn: 'root' })
export class TipoRepuestoService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-repuestos';

    constructor(private http: HttpClient) {}

    create(tipoRepuesto: ITipoRepuesto): Observable<EntityResponseType> {
        return this.http.post<ITipoRepuesto>(this.resourceUrl, tipoRepuesto, { observe: 'response' });
    }

    update(tipoRepuesto: ITipoRepuesto): Observable<EntityResponseType> {
        return this.http.put<ITipoRepuesto>(this.resourceUrl, tipoRepuesto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoRepuesto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoRepuesto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
