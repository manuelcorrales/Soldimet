import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MovimientoPedido } from './movimiento-pedido.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MovimientoPedidoService {

    private resourceUrl = SERVER_API_URL + 'api/movimiento-pedidos';

    constructor(private http: Http) { }

    create(movimientoPedido: MovimientoPedido): Observable<MovimientoPedido> {
        const copy = this.convert(movimientoPedido);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(movimientoPedido: MovimientoPedido): Observable<MovimientoPedido> {
        const copy = this.convert(movimientoPedido);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MovimientoPedido> {
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
     * Convert a returned JSON object to MovimientoPedido.
     */
    private convertItemFromServer(json: any): MovimientoPedido {
        const entity: MovimientoPedido = Object.assign(new MovimientoPedido(), json);
        return entity;
    }

    /**
     * Convert a MovimientoPedido to a JSON which can be sent to the server.
     */
    private convert(movimientoPedido: MovimientoPedido): MovimientoPedido {
        const copy: MovimientoPedido = Object.assign({}, movimientoPedido);
        return copy;
    }
}
