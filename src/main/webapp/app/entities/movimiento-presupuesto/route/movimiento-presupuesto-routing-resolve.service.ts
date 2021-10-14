import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovimientoPresupuesto, MovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';

@Injectable({ providedIn: 'root' })
export class MovimientoPresupuestoRoutingResolveService implements Resolve<IMovimientoPresupuesto> {
  constructor(protected service: MovimientoPresupuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientoPresupuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movimientoPresupuesto: HttpResponse<MovimientoPresupuesto>) => {
          if (movimientoPresupuesto.body) {
            return of(movimientoPresupuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MovimientoPresupuesto());
  }
}
