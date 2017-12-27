import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TipoMovimiento } from './tipo-movimiento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipoMovimientoService {

    private resourceUrl = SERVER_API_URL + 'api/tipo-movimientos';

    constructor(private http: Http) { }

    create(tipoMovimiento: TipoMovimiento): Observable<TipoMovimiento> {
        const copy = this.convert(tipoMovimiento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoMovimiento: TipoMovimiento): Observable<TipoMovimiento> {
        const copy = this.convert(tipoMovimiento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipoMovimiento> {
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
     * Convert a returned JSON object to TipoMovimiento.
     */
    private convertItemFromServer(json: any): TipoMovimiento {
        const entity: TipoMovimiento = Object.assign(new TipoMovimiento(), json);
        return entity;
    }

    /**
     * Convert a TipoMovimiento to a JSON which can be sent to the server.
     */
    private convert(tipoMovimiento: TipoMovimiento): TipoMovimiento {
        const copy: TipoMovimiento = Object.assign({}, tipoMovimiento);
        return copy;
    }
}
