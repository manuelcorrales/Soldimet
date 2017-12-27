import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ListaPrecioDesdeHastaService {

    private resourceUrl = SERVER_API_URL + 'api/lista-precio-desde-hastas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(listaPrecioDesdeHasta: ListaPrecioDesdeHasta): Observable<ListaPrecioDesdeHasta> {
        const copy = this.convert(listaPrecioDesdeHasta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(listaPrecioDesdeHasta: ListaPrecioDesdeHasta): Observable<ListaPrecioDesdeHasta> {
        const copy = this.convert(listaPrecioDesdeHasta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ListaPrecioDesdeHasta> {
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
     * Convert a returned JSON object to ListaPrecioDesdeHasta.
     */
    private convertItemFromServer(json: any): ListaPrecioDesdeHasta {
        const entity: ListaPrecioDesdeHasta = Object.assign(new ListaPrecioDesdeHasta(), json);
        entity.fechaDesde = this.dateUtils
            .convertLocalDateFromServer(json.fechaDesde);
        entity.fechaHasta = this.dateUtils
            .convertLocalDateFromServer(json.fechaHasta);
        return entity;
    }

    /**
     * Convert a ListaPrecioDesdeHasta to a JSON which can be sent to the server.
     */
    private convert(listaPrecioDesdeHasta: ListaPrecioDesdeHasta): ListaPrecioDesdeHasta {
        const copy: ListaPrecioDesdeHasta = Object.assign({}, listaPrecioDesdeHasta);
        copy.fechaDesde = this.dateUtils
            .convertLocalDateToServer(listaPrecioDesdeHasta.fechaDesde);
        copy.fechaHasta = this.dateUtils
            .convertLocalDateToServer(listaPrecioDesdeHasta.fechaHasta);
        return copy;
    }
}
