import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DetalleMovimiento } from './detalle-movimiento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DetalleMovimientoService {

    private resourceUrl = SERVER_API_URL + 'api/detalle-movimientos';

    constructor(private http: Http) { }

    create(detalleMovimiento: DetalleMovimiento): Observable<DetalleMovimiento> {
        const copy = this.convert(detalleMovimiento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(detalleMovimiento: DetalleMovimiento): Observable<DetalleMovimiento> {
        const copy = this.convert(detalleMovimiento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DetalleMovimiento> {
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
     * Convert a returned JSON object to DetalleMovimiento.
     */
    private convertItemFromServer(json: any): DetalleMovimiento {
        const entity: DetalleMovimiento = Object.assign(new DetalleMovimiento(), json);
        return entity;
    }

    /**
     * Convert a DetalleMovimiento to a JSON which can be sent to the server.
     */
    private convert(detalleMovimiento: DetalleMovimiento): DetalleMovimiento {
        const copy: DetalleMovimiento = Object.assign({}, detalleMovimiento);
        return copy;
    }
}
