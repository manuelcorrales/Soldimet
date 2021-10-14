import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoMovimiento, EstadoMovimiento } from '../estado-movimiento.model';
import { EstadoMovimientoService } from '../service/estado-movimiento.service';

@Injectable({ providedIn: 'root' })
export class EstadoMovimientoRoutingResolveService implements Resolve<IEstadoMovimiento> {
  constructor(protected service: EstadoMovimientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoMovimiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoMovimiento: HttpResponse<EstadoMovimiento>) => {
          if (estadoMovimiento.body) {
            return of(estadoMovimiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoMovimiento());
  }
}
