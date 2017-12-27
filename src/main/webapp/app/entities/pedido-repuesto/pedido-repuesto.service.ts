import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PedidoRepuesto } from './pedido-repuesto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PedidoRepuestoService {

    private resourceUrl = SERVER_API_URL + 'api/pedido-repuestos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pedidoRepuesto: PedidoRepuesto): Observable<PedidoRepuesto> {
        const copy = this.convert(pedidoRepuesto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pedidoRepuesto: PedidoRepuesto): Observable<PedidoRepuesto> {
        const copy = this.convert(pedidoRepuesto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PedidoRepuesto> {
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
     * Convert a returned JSON object to PedidoRepuesto.
     */
    private convertItemFromServer(json: any): PedidoRepuesto {
        const entity: PedidoRepuesto = Object.assign(new PedidoRepuesto(), json);
        entity.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(json.fechaCreacion);
        entity.fechaPedido = this.dateUtils
            .convertLocalDateFromServer(json.fechaPedido);
        entity.fechaRecibo = this.dateUtils
            .convertLocalDateFromServer(json.fechaRecibo);
        return entity;
    }

    /**
     * Convert a PedidoRepuesto to a JSON which can be sent to the server.
     */
    private convert(pedidoRepuesto: PedidoRepuesto): PedidoRepuesto {
        const copy: PedidoRepuesto = Object.assign({}, pedidoRepuesto);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(pedidoRepuesto.fechaCreacion);
        copy.fechaPedido = this.dateUtils
            .convertLocalDateToServer(pedidoRepuesto.fechaPedido);
        copy.fechaRecibo = this.dateUtils
            .convertLocalDateToServer(pedidoRepuesto.fechaRecibo);
        return copy;
    }
}
