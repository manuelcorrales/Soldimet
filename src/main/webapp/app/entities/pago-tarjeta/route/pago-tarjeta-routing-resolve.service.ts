import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPagoTarjeta, PagoTarjeta } from '../pago-tarjeta.model';
import { PagoTarjetaService } from '../service/pago-tarjeta.service';

@Injectable({ providedIn: 'root' })
export class PagoTarjetaRoutingResolveService implements Resolve<IPagoTarjeta> {
  constructor(protected service: PagoTarjetaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagoTarjeta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pagoTarjeta: HttpResponse<PagoTarjeta>) => {
          if (pagoTarjeta.body) {
            return of(pagoTarjeta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PagoTarjeta());
  }
}
