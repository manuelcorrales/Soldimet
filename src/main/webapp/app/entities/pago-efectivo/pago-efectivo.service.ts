import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PagoEfectivo } from './pago-efectivo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PagoEfectivoService {

    private resourceUrl = SERVER_API_URL + 'api/pago-efectivos';

    constructor(private http: Http) { }

    create(pagoEfectivo: PagoEfectivo): Observable<PagoEfectivo> {
        const copy = this.convert(pagoEfectivo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pagoEfectivo: PagoEfectivo): Observable<PagoEfectivo> {
        const copy = this.convert(pagoEfectivo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PagoEfectivo> {
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
     * Convert a returned JSON object to PagoEfectivo.
     */
    private convertItemFromServer(json: any): PagoEfectivo {
        const entity: PagoEfectivo = Object.assign(new PagoEfectivo(), json);
        return entity;
    }

    /**
     * Convert a PagoEfectivo to a JSON which can be sent to the server.
     */
    private convert(pagoEfectivo: PagoEfectivo): PagoEfectivo {
        const copy: PagoEfectivo = Object.assign({}, pagoEfectivo);
        return copy;
    }
}
