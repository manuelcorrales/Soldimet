import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PagoCheque } from './pago-cheque.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PagoChequeService {

    private resourceUrl = SERVER_API_URL + 'api/pago-cheques';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pagoCheque: PagoCheque): Observable<PagoCheque> {
        const copy = this.convert(pagoCheque);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pagoCheque: PagoCheque): Observable<PagoCheque> {
        const copy = this.convert(pagoCheque);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PagoCheque> {
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
     * Convert a returned JSON object to PagoCheque.
     */
    private convertItemFromServer(json: any): PagoCheque {
        const entity: PagoCheque = Object.assign(new PagoCheque(), json);
        entity.fechaCobro = this.dateUtils
            .convertLocalDateFromServer(json.fechaCobro);
        entity.fechaRecibo = this.dateUtils
            .convertLocalDateFromServer(json.fechaRecibo);
        return entity;
    }

    /**
     * Convert a PagoCheque to a JSON which can be sent to the server.
     */
    private convert(pagoCheque: PagoCheque): PagoCheque {
        const copy: PagoCheque = Object.assign({}, pagoCheque);
        copy.fechaCobro = this.dateUtils
            .convertLocalDateToServer(pagoCheque.fechaCobro);
        copy.fechaRecibo = this.dateUtils
            .convertLocalDateToServer(pagoCheque.fechaRecibo);
        return copy;
    }
}
