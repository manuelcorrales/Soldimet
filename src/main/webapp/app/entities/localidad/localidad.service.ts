import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Localidad } from './localidad.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LocalidadService {

    private resourceUrl = SERVER_API_URL + 'api/localidads';

    constructor(private http: Http) { }

    create(localidad: Localidad): Observable<Localidad> {
        const copy = this.convert(localidad);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(localidad: Localidad): Observable<Localidad> {
        const copy = this.convert(localidad);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Localidad> {
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
     * Convert a returned JSON object to Localidad.
     */
    private convertItemFromServer(json: any): Localidad {
        const entity: Localidad = Object.assign(new Localidad(), json);
        return entity;
    }

    /**
     * Convert a Localidad to a JSON which can be sent to the server.
     */
    private convert(localidad: Localidad): Localidad {
        const copy: Localidad = Object.assign({}, localidad);
        return copy;
    }
}
