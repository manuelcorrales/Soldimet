import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Rubro } from './rubro.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RubroService {

    private resourceUrl = SERVER_API_URL + 'api/rubros';

    constructor(private http: Http) { }

    create(rubro: Rubro): Observable<Rubro> {
        const copy = this.convert(rubro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rubro: Rubro): Observable<Rubro> {
        const copy = this.convert(rubro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Rubro> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Rubro.
     */
    private convertItemFromServer(json: any): Rubro {
        const entity: Rubro = Object.assign(new Rubro(), json);
        return entity;
    }

    /**
     * Convert a Rubro to a JSON which can be sent to the server.
     */
    private convert(rubro: Rubro): Rubro {
        const copy: Rubro = Object.assign({}, rubro);
        return copy;
    }
}
