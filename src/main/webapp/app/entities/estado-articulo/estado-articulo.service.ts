import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EstadoArticulo } from './estado-articulo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstadoArticuloService {

    private resourceUrl = SERVER_API_URL + 'api/estado-articulos';

    constructor(private http: Http) { }

    create(estadoArticulo: EstadoArticulo): Observable<EstadoArticulo> {
        const copy = this.convert(estadoArticulo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estadoArticulo: EstadoArticulo): Observable<EstadoArticulo> {
        const copy = this.convert(estadoArticulo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EstadoArticulo> {
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
     * Convert a returned JSON object to EstadoArticulo.
     */
    private convertItemFromServer(json: any): EstadoArticulo {
        const entity: EstadoArticulo = Object.assign(new EstadoArticulo(), json);
        return entity;
    }

    /**
     * Convert a EstadoArticulo to a JSON which can be sent to the server.
     */
    private convert(estadoArticulo: EstadoArticulo): EstadoArticulo {
        const copy: EstadoArticulo = Object.assign({}, estadoArticulo);
        return copy;
    }
}
