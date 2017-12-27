import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipoDetalleMovimientoService {

    private resourceUrl = SERVER_API_URL + 'api/tipo-detalle-movimientos';

    constructor(private http: Http) { }

    create(tipoDetalleMovimiento: TipoDetalleMovimiento): Observable<TipoDetalleMovimiento> {
        const copy = this.convert(tipoDetalleMovimiento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoDetalleMovimiento: TipoDetalleMovimiento): Observable<TipoDetalleMovimiento> {
        const copy = this.convert(tipoDetalleMovimiento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipoDetalleMovimiento> {
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
     * Convert a returned JSON object to TipoDetalleMovimiento.
     */
    private convertItemFromServer(json: any): TipoDetalleMovimiento {
        const entity: TipoDetalleMovimiento = Object.assign(new TipoDetalleMovimiento(), json);
        return entity;
    }

    /**
     * Convert a TipoDetalleMovimiento to a JSON which can be sent to the server.
     */
    private convert(tipoDetalleMovimiento: TipoDetalleMovimiento): TipoDetalleMovimiento {
        const copy: TipoDetalleMovimiento = Object.assign({}, tipoDetalleMovimiento);
        return copy;
    }
}
