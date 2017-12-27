import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EstadoPersona } from './estado-persona.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstadoPersonaService {

    private resourceUrl = SERVER_API_URL + 'api/estado-personas';

    constructor(private http: Http) { }

    create(estadoPersona: EstadoPersona): Observable<EstadoPersona> {
        const copy = this.convert(estadoPersona);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estadoPersona: EstadoPersona): Observable<EstadoPersona> {
        const copy = this.convert(estadoPersona);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EstadoPersona> {
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
     * Convert a returned JSON object to EstadoPersona.
     */
    private convertItemFromServer(json: any): EstadoPersona {
        const entity: EstadoPersona = Object.assign(new EstadoPersona(), json);
        return entity;
    }

    /**
     * Convert a EstadoPersona to a JSON which can be sent to the server.
     */
    private convert(estadoPersona: EstadoPersona): EstadoPersona {
        const copy: EstadoPersona = Object.assign({}, estadoPersona);
        return copy;
    }
}
