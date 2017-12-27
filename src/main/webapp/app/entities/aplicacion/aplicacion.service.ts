import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Aplicacion } from './aplicacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AplicacionService {

    private resourceUrl = SERVER_API_URL + 'api/aplicacions';

    constructor(private http: Http) { }

    create(aplicacion: Aplicacion): Observable<Aplicacion> {
        const copy = this.convert(aplicacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(aplicacion: Aplicacion): Observable<Aplicacion> {
        const copy = this.convert(aplicacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Aplicacion> {
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
     * Convert a returned JSON object to Aplicacion.
     */
    private convertItemFromServer(json: any): Aplicacion {
        const entity: Aplicacion = Object.assign(new Aplicacion(), json);
        return entity;
    }

    /**
     * Convert a Aplicacion to a JSON which can be sent to the server.
     */
    private convert(aplicacion: Aplicacion): Aplicacion {
        const copy: Aplicacion = Object.assign({}, aplicacion);
        return copy;
    }
}
