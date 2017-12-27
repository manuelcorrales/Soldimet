import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Cilindrada } from './cilindrada.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CilindradaService {

    private resourceUrl = SERVER_API_URL + 'api/cilindradas';

    constructor(private http: Http) { }

    create(cilindrada: Cilindrada): Observable<Cilindrada> {
        const copy = this.convert(cilindrada);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(cilindrada: Cilindrada): Observable<Cilindrada> {
        const copy = this.convert(cilindrada);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Cilindrada> {
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
     * Convert a returned JSON object to Cilindrada.
     */
    private convertItemFromServer(json: any): Cilindrada {
        const entity: Cilindrada = Object.assign(new Cilindrada(), json);
        return entity;
    }

    /**
     * Convert a Cilindrada to a JSON which can be sent to the server.
     */
    private convert(cilindrada: Cilindrada): Cilindrada {
        const copy: Cilindrada = Object.assign({}, cilindrada);
        return copy;
    }
}
