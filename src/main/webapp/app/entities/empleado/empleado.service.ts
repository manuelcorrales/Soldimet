import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Empleado } from './empleado.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EmpleadoService {

    private resourceUrl = SERVER_API_URL + 'api/empleados';

    constructor(private http: Http) { }

    create(empleado: Empleado): Observable<Empleado> {
        const copy = this.convert(empleado);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(empleado: Empleado): Observable<Empleado> {
        const copy = this.convert(empleado);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Empleado> {
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
     * Convert a returned JSON object to Empleado.
     */
    private convertItemFromServer(json: any): Empleado {
        const entity: Empleado = Object.assign(new Empleado(), json);
        return entity;
    }

    /**
     * Convert a Empleado to a JSON which can be sent to the server.
     */
    private convert(empleado: Empleado): Empleado {
        const copy: Empleado = Object.assign({}, empleado);
        return copy;
    }
}
