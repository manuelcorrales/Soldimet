import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EstadoPedidoRepuestoService {

    private resourceUrl = SERVER_API_URL + 'api/estado-pedido-repuestos';

    constructor(private http: Http) { }

    create(estadoPedidoRepuesto: EstadoPedidoRepuesto): Observable<EstadoPedidoRepuesto> {
        const copy = this.convert(estadoPedidoRepuesto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(estadoPedidoRepuesto: EstadoPedidoRepuesto): Observable<EstadoPedidoRepuesto> {
        const copy = this.convert(estadoPedidoRepuesto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EstadoPedidoRepuesto> {
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
     * Convert a returned JSON object to EstadoPedidoRepuesto.
     */
    private convertItemFromServer(json: any): EstadoPedidoRepuesto {
        const entity: EstadoPedidoRepuesto = Object.assign(new EstadoPedidoRepuesto(), json);
        return entity;
    }

    /**
     * Convert a EstadoPedidoRepuesto to a JSON which can be sent to the server.
     */
    private convert(estadoPedidoRepuesto: EstadoPedidoRepuesto): EstadoPedidoRepuesto {
        const copy: EstadoPedidoRepuesto = Object.assign({}, estadoPedidoRepuesto);
        return copy;
    }
}
