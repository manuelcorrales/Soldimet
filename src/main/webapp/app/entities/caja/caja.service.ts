import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Caja } from './caja.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CajaService {

    private resourceUrl = SERVER_API_URL + 'api/cajas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(caja: Caja): Observable<Caja> {
        const copy = this.convert(caja);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(caja: Caja): Observable<Caja> {
        const copy = this.convert(caja);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Caja> {
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
     * Convert a returned JSON object to Caja.
     */
    private convertItemFromServer(json: any): Caja {
        const entity: Caja = Object.assign(new Caja(), json);
        entity.fecha = this.dateUtils
            .convertLocalDateFromServer(json.fecha);
        entity.horaApertura = this.dateUtils
            .convertDateTimeFromServer(json.horaApertura);
        entity.horaCierre = this.dateUtils
            .convertDateTimeFromServer(json.horaCierre);
        return entity;
    }

    /**
     * Convert a Caja to a JSON which can be sent to the server.
     */
    private convert(caja: Caja): Caja {
        const copy: Caja = Object.assign({}, caja);
        copy.fecha = this.dateUtils
            .convertLocalDateToServer(caja.fecha);

        copy.horaApertura = this.dateUtils.toDate(caja.horaApertura);

        copy.horaCierre = this.dateUtils.toDate(caja.horaCierre);
        return copy;
    }
}
