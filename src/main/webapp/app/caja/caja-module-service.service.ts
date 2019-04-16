import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DtoCajaDiaComponent } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
import { Observable } from '../../../../../node_modules/rxjs';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { Movimiento } from 'app/shared/model/movimiento.model';

@Injectable({
    providedIn: 'root'
})
export class CajaModuleServiceService {
    private resourceUrlCaja = SERVER_API_URL + 'api/caja';
    private urlMovimientosDia = '/dia';
    private urlSaveMovimiento = '/nuevo_movimiento';

    constructor(private http: HttpClient) {}

    getMovimientosDia(): Observable<DtoCajaDiaComponent> {
        const urlLlamada = `${this.resourceUrlCaja}${this.urlMovimientosDia}`;
        return this.http.get<DtoCajaDiaComponent>(urlLlamada);
    }

    saveMovimiento(movimiento: Movimiento): Observable<Movimiento> {
        const urlLlamada = `${this.resourceUrlCaja}${this.urlSaveMovimiento}`;
        return this.http.post<Movimiento>(urlLlamada, movimiento);
    }
}
