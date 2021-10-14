import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMedioDePagoTarjeta, MedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';

@Injectable({ providedIn: 'root' })
export class MedioDePagoTarjetaRoutingResolveService implements Resolve<IMedioDePagoTarjeta> {
  constructor(protected service: MedioDePagoTarjetaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedioDePagoTarjeta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((medioDePagoTarjeta: HttpResponse<MedioDePagoTarjeta>) => {
          if (medioDePagoTarjeta.body) {
            return of(medioDePagoTarjeta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedioDePagoTarjeta());
  }
}
