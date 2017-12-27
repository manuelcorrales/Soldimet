import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CostoOperacion } from './costo-operacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CostoOperacionService {

    private resourceUrl = SERVER_API_URL + 'api/costo-operacions';

    constructor(private http: Http) { }

    create(costoOperacion: CostoOperacion): Observable<CostoOperacion> {
        const copy = this.convert(costoOperacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(costoOperacion: CostoOperacion): Observable<CostoOperacion> {
        const copy = this.convert(costoOperacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CostoOperacion> {
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
     * Convert a returned JSON object to CostoOperacion.
     */
    private convertItemFromServer(json: any): CostoOperacion {
        const entity: CostoOperacion = Object.assign(new CostoOperacion(), json);
        return entity;
    }

    /**
     * Convert a CostoOperacion to a JSON which can be sent to the server.
     */
    private convert(costoOperacion: CostoOperacion): CostoOperacion {
        const copy: CostoOperacion = Object.assign({}, costoOperacion);
        return copy;
    }
}
