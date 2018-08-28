import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { Injectable } from '../../../../../node_modules/@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { DTOListaPrecioManoDeObraComponent } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class OperacionesService {
    private resourceUrlOperaciones = SERVER_API_URL + 'api/operaciones';
    private urlBuscarListasActivas = '/getListaPreciosOperacionesActualizada';

    constructor(private http: HttpClient) {}

    getListasOperacionesAutorizadas(): Observable<DTOListaPrecioManoDeObraComponent[]> {
        const urlLlamada = `${this.resourceUrlOperaciones}${this.urlBuscarListasActivas}`;
        return this.http.get<DTOListaPrecioManoDeObraComponent[]>(urlLlamada);
    }
}
