import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoDetalleMovimiento, TipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';

@Injectable({ providedIn: 'root' })
export class TipoDetalleMovimientoRoutingResolveService implements Resolve<ITipoDetalleMovimiento> {
  constructor(protected service: TipoDetalleMovimientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoDetalleMovimiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoDetalleMovimiento: HttpResponse<TipoDetalleMovimiento>) => {
          if (tipoDetalleMovimiento.body) {
            return of(tipoDetalleMovimiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoDetalleMovimiento());
  }
}
