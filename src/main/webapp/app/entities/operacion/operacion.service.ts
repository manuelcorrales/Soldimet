import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Operacion } from './operacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OperacionService {

    private resourceUrl = SERVER_API_URL + 'api/operacions';

    constructor(private http: Http) { }

    create(operacion: Operacion): Observable<Operacion> {
        const copy = this.convert(operacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(operacion: Operacion): Observable<Operacion> {
        const copy = this.convert(operacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Operacion> {
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
     * Convert a returned JSON object to Operacion.
     */
    private convertItemFromServer(json: any): Operacion {
        const entity: Operacion = Object.assign(new Operacion(), json);
        return entity;
    }

    /**
     * Convert a Operacion to a JSON which can be sent to the server.
     */
    private convert(operacion: Operacion): Operacion {
        const copy: Operacion = Object.assign({}, operacion);
        return copy;
    }
}
