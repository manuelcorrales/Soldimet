import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PresupuestoService {

    private resourceUrl = SERVER_API_URL + 'api/presupuestos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(presupuesto: Presupuesto): Observable<Presupuesto> {
        const copy = this.convert(presupuesto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(presupuesto: Presupuesto): Observable<Presupuesto> {
        const copy = this.convert(presupuesto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Presupuesto> {
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
     * Convert a returned JSON object to Presupuesto.
     */
    private convertItemFromServer(json: any): Presupuesto {
        const entity: Presupuesto = Object.assign(new Presupuesto(), json);
        entity.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(json.fechaCreacion);
        entity.fechaAceptado = this.dateUtils
            .convertLocalDateFromServer(json.fechaAceptado);
        entity.fechaEntregado = this.dateUtils
            .convertLocalDateFromServer(json.fechaEntregado);
        return entity;
    }

    /**
     * Convert a Presupuesto to a JSON which can be sent to the server.
     */
    private convert(presupuesto: Presupuesto): Presupuesto {
        const copy: Presupuesto = Object.assign({}, presupuesto);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(presupuesto.fechaCreacion);
        copy.fechaAceptado = this.dateUtils
            .convertLocalDateToServer(presupuesto.fechaAceptado);
        copy.fechaEntregado = this.dateUtils
            .convertLocalDateToServer(presupuesto.fechaEntregado);
        return copy;
    }
}
