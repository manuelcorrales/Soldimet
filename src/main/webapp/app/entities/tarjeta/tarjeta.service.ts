import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Tarjeta } from './tarjeta.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TarjetaService {

    private resourceUrl = SERVER_API_URL + 'api/tarjetas';

    constructor(private http: Http) { }

    create(tarjeta: Tarjeta): Observable<Tarjeta> {
        const copy = this.convert(tarjeta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tarjeta: Tarjeta): Observable<Tarjeta> {
        const copy = this.convert(tarjeta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tarjeta> {
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
     * Convert a returned JSON object to Tarjeta.
     */
    private convertItemFromServer(json: any): Tarjeta {
        const entity: Tarjeta = Object.assign(new Tarjeta(), json);
        return entity;
    }

    /**
     * Convert a Tarjeta to a JSON which can be sent to the server.
     */
    private convert(tarjeta: Tarjeta): Tarjeta {
        const copy: Tarjeta = Object.assign({}, tarjeta);
        return copy;
    }
}
