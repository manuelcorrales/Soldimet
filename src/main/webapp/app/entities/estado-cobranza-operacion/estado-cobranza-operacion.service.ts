import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstadoCobranzaOperacionService {

    private resourceUrl = SERVER_API_URL + 'api/estado-cobranza-operacions';

    constructor(private http: Http) { }

    create(estadoCobranzaOperacion: EstadoCobranzaOperacion): Observable<EstadoCobranzaOperacion> {
        const copy = this.convert(estadoCobranzaOperacion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estadoCobranzaOperacion: EstadoCobranzaOperacion): Observable<EstadoCobranzaOperacion> {
        const copy = this.convert(estadoCobranzaOperacion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EstadoCobranzaOperacion> {
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
     * Convert a returned JSON object to EstadoCobranzaOperacion.
     */
    private convertItemFromServer(json: any): EstadoCobranzaOperacion {
        const entity: EstadoCobranzaOperacion = Object.assign(new EstadoCobranzaOperacion(), json);
        return entity;
    }

    /**
     * Convert a EstadoCobranzaOperacion to a JSON which can be sent to the server.
     */
    private convert(estadoCobranzaOperacion: EstadoCobranzaOperacion): EstadoCobranzaOperacion {
        const copy: EstadoCobranzaOperacion = Object.assign({}, estadoCobranzaOperacion);
        return copy;
    }
}
