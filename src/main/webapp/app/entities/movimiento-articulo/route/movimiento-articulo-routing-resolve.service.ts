import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovimientoArticulo, MovimientoArticulo } from '../movimiento-articulo.model';
import { MovimientoArticuloService } from '../service/movimiento-articulo.service';

@Injectable({ providedIn: 'root' })
export class MovimientoArticuloRoutingResolveService implements Resolve<IMovimientoArticulo> {
  constructor(protected service: MovimientoArticuloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientoArticulo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movimientoArticulo: HttpResponse<MovimientoArticulo>) => {
          if (movimientoArticulo.body) {
            return of(movimientoArticulo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MovimientoArticulo());
  }
}
