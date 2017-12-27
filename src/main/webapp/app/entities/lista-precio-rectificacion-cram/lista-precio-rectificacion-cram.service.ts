import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ListaPrecioRectificacionCRAMService {

    private resourceUrl = SERVER_API_URL + 'api/lista-precio-rectificacion-crams';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM): Observable<ListaPrecioRectificacionCRAM> {
        const copy = this.convert(listaPrecioRectificacionCRAM);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM): Observable<ListaPrecioRectificacionCRAM> {
        const copy = this.convert(listaPrecioRectificacionCRAM);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ListaPrecioRectificacionCRAM> {
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
     * Convert a returned JSON object to ListaPrecioRectificacionCRAM.
     */
    private convertItemFromServer(json: any): ListaPrecioRectificacionCRAM {
        const entity: ListaPrecioRectificacionCRAM = Object.assign(new ListaPrecioRectificacionCRAM(), json);
        entity.fechaVigenciaDesde = this.dateUtils
            .convertLocalDateFromServer(json.fechaVigenciaDesde);
        entity.fechaVigenciaHasta = this.dateUtils
            .convertLocalDateFromServer(json.fechaVigenciaHasta);
        return entity;
    }

    /**
     * Convert a ListaPrecioRectificacionCRAM to a JSON which can be sent to the server.
     */
    private convert(listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM): ListaPrecioRectificacionCRAM {
        const copy: ListaPrecioRectificacionCRAM = Object.assign({}, listaPrecioRectificacionCRAM);
        copy.fechaVigenciaDesde = this.dateUtils
            .convertLocalDateToServer(listaPrecioRectificacionCRAM.fechaVigenciaDesde);
        copy.fechaVigenciaHasta = this.dateUtils
            .convertLocalDateToServer(listaPrecioRectificacionCRAM.fechaVigenciaHasta);
        return copy;
    }
}
