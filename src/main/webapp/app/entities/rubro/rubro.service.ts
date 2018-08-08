import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRubro } from 'app/shared/model/rubro.model';

type EntityResponseType = HttpResponse<IRubro>;
type EntityArrayResponseType = HttpResponse<IRubro[]>;

@Injectable({ providedIn: 'root' })
export class RubroService {
    private resourceUrl = SERVER_API_URL + 'api/rubros';

    constructor(private http: HttpClient) {}

    create(rubro: IRubro): Observable<EntityResponseType> {
        return this.http.post<IRubro>(this.resourceUrl, rubro, { observe: 'response' });
    }

    update(rubro: IRubro): Observable<EntityResponseType> {
        return this.http.put<IRubro>(this.resourceUrl, rubro, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRubro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRubro[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
