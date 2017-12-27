import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Direccion } from './direccion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DireccionService {

    private resourceUrl = SERVER_API_URL + 'api/direccions';

    constructor(private http: Http) { }

    create(direccion: Direccion): Observable<Direccion> {
        const copy = this.convert(direccion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(direccion: Direccion): Observable<Direccion> {
        const copy = this.convert(direccion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Direccion> {
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
     * Convert a returned JSON object to Direccion.
     */
    private convertItemFromServer(json: any): Direccion {
        const entity: Direccion = Object.assign(new Direccion(), json);
        return entity;
    }

    /**
     * Convert a Direccion to a JSON which can be sent to the server.
     */
    private convert(direccion: Direccion): Direccion {
        const copy: Direccion = Object.assign({}, direccion);
        return copy;
    }
}
