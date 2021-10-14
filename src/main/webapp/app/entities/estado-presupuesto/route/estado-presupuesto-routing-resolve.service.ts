import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoPresupuesto, EstadoPresupuesto } from '../estado-presupuesto.model';
import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';

@Injectable({ providedIn: 'root' })
export class EstadoPresupuestoRoutingResolveService implements Resolve<IEstadoPresupuesto> {
  constructor(protected service: EstadoPresupuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoPresupuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoPresupuesto: HttpResponse<EstadoPresupuesto>) => {
          if (estadoPresupuesto.body) {
            return of(estadoPresupuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoPresupuesto());
  }
}
