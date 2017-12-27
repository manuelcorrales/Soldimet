import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CategoriaPago } from './categoria-pago.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CategoriaPagoService {

    private resourceUrl = SERVER_API_URL + 'api/categoria-pagos';

    constructor(private http: Http) { }

    create(categoriaPago: CategoriaPago): Observable<CategoriaPago> {
        const copy = this.convert(categoriaPago);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(categoriaPago: CategoriaPago): Observable<CategoriaPago> {
        const copy = this.convert(categoriaPago);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CategoriaPago> {
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
     * Convert a returned JSON object to CategoriaPago.
     */
    private convertItemFromServer(json: any): CategoriaPago {
        const entity: CategoriaPago = Object.assign(new CategoriaPago(), json);
        return entity;
    }

    /**
     * Convert a CategoriaPago to a JSON which can be sent to the server.
     */
    private convert(categoriaPago: CategoriaPago): CategoriaPago {
        const copy: CategoriaPago = Object.assign({}, categoriaPago);
        return copy;
    }
}
