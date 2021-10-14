import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetallePresupuesto, DetallePresupuesto } from '../detalle-presupuesto.model';
import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';

@Injectable({ providedIn: 'root' })
export class DetallePresupuestoRoutingResolveService implements Resolve<IDetallePresupuesto> {
  constructor(protected service: DetallePresupuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetallePresupuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detallePresupuesto: HttpResponse<DetallePresupuesto>) => {
          if (detallePresupuesto.body) {
            return of(detallePresupuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetallePresupuesto());
  }
}
