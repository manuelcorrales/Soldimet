import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TipoRepuesto } from './tipo-repuesto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TipoRepuestoService {

    private resourceUrl = SERVER_API_URL + 'api/tipo-repuestos';

    constructor(private http: Http) { }

    create(tipoRepuesto: TipoRepuesto): Observable<TipoRepuesto> {
        const copy = this.convert(tipoRepuesto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tipoRepuesto: TipoRepuesto): Observable<TipoRepuesto> {
        const copy = this.convert(tipoRepuesto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TipoRepuesto> {
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
     * Convert a returned JSON object to TipoRepuesto.
     */
    private convertItemFromServer(json: any): TipoRepuesto {
        const entity: TipoRepuesto = Object.assign(new TipoRepuesto(), json);
        return entity;
    }

    /**
     * Convert a TipoRepuesto to a JSON which can be sent to the server.
     */
    private convert(tipoRepuesto: TipoRepuesto): TipoRepuesto {
        const copy: TipoRepuesto = Object.assign({}, tipoRepuesto);
        return copy;
    }
}
