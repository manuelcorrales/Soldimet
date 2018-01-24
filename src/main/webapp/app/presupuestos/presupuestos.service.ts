import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../app.constants";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {JhiDateUtils} from "ng-jhipster";
import {DtoPresupuestoCabeceraComponent} from "../dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component";
import {ResponseWrapper} from "../shared/model/response-wrapper.model";

@Injectable()
export class PresupuestosService {

    private resourceUrl = SERVER_API_URL + 'api/presupuestos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    find(id: number): Observable<DtoPresupuestoCabeceraComponent> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    /**
     * Convert a returned JSON object to PresupuestoDTO.
     */
    private convertItemFromServer(json: any): DtoPresupuestoCabeceraComponent {
        const entity: DtoPresupuestoCabeceraComponent =
            Object.assign(new DtoPresupuestoCabeceraComponent(), json);
        entity.fecha = this.dateUtils
        .convertLocalDateFromServer(json.fecha);
        return entity;
    }


}
