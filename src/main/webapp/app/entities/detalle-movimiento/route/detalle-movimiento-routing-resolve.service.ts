import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetalleMovimiento, DetalleMovimiento } from '../detalle-movimiento.model';
import { DetalleMovimientoService } from '../service/detalle-movimiento.service';

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoRoutingResolveService implements Resolve<IDetalleMovimiento> {
  constructor(protected service: DetalleMovimientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetalleMovimiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detalleMovimiento: HttpResponse<DetalleMovimiento>) => {
          if (detalleMovimiento.body) {
            return of(detalleMovimiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetalleMovimiento());
  }
}
