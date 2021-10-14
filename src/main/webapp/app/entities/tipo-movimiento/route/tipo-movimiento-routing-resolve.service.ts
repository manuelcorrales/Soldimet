import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoMovimiento, TipoMovimiento } from '../tipo-movimiento.model';
import { TipoMovimientoService } from '../service/tipo-movimiento.service';

@Injectable({ providedIn: 'root' })
export class TipoMovimientoRoutingResolveService implements Resolve<ITipoMovimiento> {
  constructor(protected service: TipoMovimientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoMovimiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoMovimiento: HttpResponse<TipoMovimiento>) => {
          if (tipoMovimiento.body) {
            return of(tipoMovimiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoMovimiento());
  }
}
