import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EstadoMovimiento } from './estado-movimiento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstadoMovimientoService {

    private resourceUrl = SERVER_API_URL + 'api/estado-movimientos';

    constructor(private http: Http) { }

    create(estadoMovimiento: EstadoMovimiento): Observable<EstadoMovimiento> {
        const copy = this.convert(estadoMovimiento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estadoMovimiento: EstadoMovimiento): Observable<EstadoMovimiento> {
        const copy = this.convert(estadoMovimiento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EstadoMovimiento> {
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
     * Convert a returned JSON object to EstadoMovimiento.
     */
    private convertItemFromServer(json: any): EstadoMovimiento {
        const entity: EstadoMovimiento = Object.assign(new EstadoMovimiento(), json);
        return entity;
    }

    /**
     * Convert a EstadoMovimiento to a JSON which can be sent to the server.
     */
    private convert(estadoMovimiento: EstadoMovimiento): EstadoMovimiento {
        const copy: EstadoMovimiento = Object.assign({}, estadoMovimiento);
        return copy;
    }
}
