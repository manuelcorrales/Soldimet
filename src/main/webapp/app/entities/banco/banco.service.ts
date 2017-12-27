import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Banco } from './banco.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BancoService {

    private resourceUrl = SERVER_API_URL + 'api/bancos';

    constructor(private http: Http) { }

    create(banco: Banco): Observable<Banco> {
        const copy = this.convert(banco);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(banco: Banco): Observable<Banco> {
        const copy = this.convert(banco);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Banco> {
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
     * Convert a returned JSON object to Banco.
     */
    private convertItemFromServer(json: any): Banco {
        const entity: Banco = Object.assign(new Banco(), json);
        return entity;
    }

    /**
     * Convert a Banco to a JSON which can be sent to the server.
     */
    private convert(banco: Banco): Banco {
        const copy: Banco = Object.assign({}, banco);
        return copy;
    }
}
