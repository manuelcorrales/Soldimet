import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPagoEfectivo, PagoEfectivo } from '../pago-efectivo.model';
import { PagoEfectivoService } from '../service/pago-efectivo.service';

@Injectable({ providedIn: 'root' })
export class PagoEfectivoRoutingResolveService implements Resolve<IPagoEfectivo> {
  constructor(protected service: PagoEfectivoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagoEfectivo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pagoEfectivo: HttpResponse<PagoEfectivo>) => {
          if (pagoEfectivo.body) {
            return of(pagoEfectivo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PagoEfectivo());
  }
}
