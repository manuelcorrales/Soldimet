import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Articulo } from './articulo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArticuloService {

    private resourceUrl = SERVER_API_URL + 'api/articulos';

    constructor(private http: Http) { }

    create(articulo: Articulo): Observable<Articulo> {
        const copy = this.convert(articulo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(articulo: Articulo): Observable<Articulo> {
        const copy = this.convert(articulo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Articulo> {
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
     * Convert a returned JSON object to Articulo.
     */
    private convertItemFromServer(json: any): Articulo {
        const entity: Articulo = Object.assign(new Articulo(), json);
        return entity;
    }

    /**
     * Convert a Articulo to a JSON which can be sent to the server.
     */
    private convert(articulo: Articulo): Articulo {
        const copy: Articulo = Object.assign({}, articulo);
        return copy;
    }
}
