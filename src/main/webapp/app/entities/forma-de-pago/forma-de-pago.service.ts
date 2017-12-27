import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { FormaDePago } from './forma-de-pago.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FormaDePagoService {

    private resourceUrl = SERVER_API_URL + 'api/forma-de-pagos';

    constructor(private http: Http) { }

    create(formaDePago: FormaDePago): Observable<FormaDePago> {
        const copy = this.convert(formaDePago);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(formaDePago: FormaDePago): Observable<FormaDePago> {
        const copy = this.convert(formaDePago);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FormaDePago> {
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
     * Convert a returned JSON object to FormaDePago.
     */
    private convertItemFromServer(json: any): FormaDePago {
        const entity: FormaDePago = Object.assign(new FormaDePago(), json);
        return entity;
    }

    /**
     * Convert a FormaDePago to a JSON which can be sent to the server.
     */
    private convert(formaDePago: FormaDePago): FormaDePago {
        const copy: FormaDePago = Object.assign({}, formaDePago);
        return copy;
    }
}
