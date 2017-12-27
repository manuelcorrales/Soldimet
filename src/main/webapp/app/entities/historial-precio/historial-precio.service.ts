import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { HistorialPrecio } from './historial-precio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HistorialPrecioService {

    private resourceUrl = SERVER_API_URL + 'api/historial-precios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(historialPrecio: HistorialPrecio): Observable<HistorialPrecio> {
        const copy = this.convert(historialPrecio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(historialPrecio: HistorialPrecio): Observable<HistorialPrecio> {
        const copy = this.convert(historialPrecio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<HistorialPrecio> {
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
     * Convert a returned JSON object to HistorialPrecio.
     */
    private convertItemFromServer(json: any): HistorialPrecio {
        const entity: HistorialPrecio = Object.assign(new HistorialPrecio(), json);
        entity.fechaHistorial = this.dateUtils
            .convertLocalDateFromServer(json.fechaHistorial);
        return entity;
    }

    /**
     * Convert a HistorialPrecio to a JSON which can be sent to the server.
     */
    private convert(historialPrecio: HistorialPrecio): HistorialPrecio {
        const copy: HistorialPrecio = Object.assign({}, historialPrecio);
        copy.fechaHistorial = this.dateUtils
            .convertLocalDateToServer(historialPrecio.fechaHistorial);
        return copy;
    }
}
