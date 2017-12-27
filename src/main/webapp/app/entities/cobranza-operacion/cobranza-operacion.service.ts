import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CobranzaOperacion } from './cobranza-operacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CobranzaOperacionService {

    private resourceUrl = SERVER_API_URL + 'api/cobranza-operacions';

    constructor(private http: Http) { }

    create(cobranzaOperacion: CobranzaOperacion): Observable<CobranzaOperacion> {
        const copy = this.convert(cobranzaOperacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cobranzaOperacion: CobranzaOperacion): Observable<CobranzaOperacion> {
        const copy = this.convert(cobranzaOperacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CobranzaOperacion> {
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
     * Convert a returned JSON object to CobranzaOperacion.
     */
    private convertItemFromServer(json: any): CobranzaOperacion {
        const entity: CobranzaOperacion = Object.assign(new CobranzaOperacion(), json);
        return entity;
    }

    /**
     * Convert a CobranzaOperacion to a JSON which can be sent to the server.
     */
    private convert(cobranzaOperacion: CobranzaOperacion): CobranzaOperacion {
        const copy: CobranzaOperacion = Object.assign({}, cobranzaOperacion);
        return copy;
    }
}
