import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrecioRepuesto } from './precio-repuesto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PrecioRepuestoService {

    private resourceUrl = SERVER_API_URL + 'api/precio-repuestos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(precioRepuesto: PrecioRepuesto): Observable<PrecioRepuesto> {
        const copy = this.convert(precioRepuesto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(precioRepuesto: PrecioRepuesto): Observable<PrecioRepuesto> {
        const copy = this.convert(precioRepuesto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PrecioRepuesto> {
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
     * Convert a returned JSON object to PrecioRepuesto.
     */
    private convertItemFromServer(json: any): PrecioRepuesto {
        const entity: PrecioRepuesto = Object.assign(new PrecioRepuesto(), json);
        entity.fecha = this.dateUtils
            .convertLocalDateFromServer(json.fecha);
        return entity;
    }

    /**
     * Convert a PrecioRepuesto to a JSON which can be sent to the server.
     */
    private convert(precioRepuesto: PrecioRepuesto): PrecioRepuesto {
        const copy: PrecioRepuesto = Object.assign({}, precioRepuesto);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(precioRepuesto.fecha);
        return copy;
    }
}
