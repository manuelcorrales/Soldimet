import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Movimiento } from './movimiento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MovimientoService {

    private resourceUrl = SERVER_API_URL + 'api/movimientos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(movimiento: Movimiento): Observable<Movimiento> {
        const copy = this.convert(movimiento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(movimiento: Movimiento): Observable<Movimiento> {
        const copy = this.convert(movimiento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Movimiento> {
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
     * Convert a returned JSON object to Movimiento.
     */
    private convertItemFromServer(json: any): Movimiento {
        const entity: Movimiento = Object.assign(new Movimiento(), json);
        entity.fecha = this.dateUtils
            .convertLocalDateFromServer(json.fecha);
        entity.hora = this.dateUtils
            .convertDateTimeFromServer(json.hora);
        return entity;
    }

    /**
     * Convert a Movimiento to a JSON which can be sent to the server.
     */
    private convert(movimiento: Movimiento): Movimiento {
        const copy: Movimiento = Object.assign({}, movimiento);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(movimiento.fecha);

        copy.hora = this.dateUtils.toDate(movimiento.hora);
        return copy;
    }
}
