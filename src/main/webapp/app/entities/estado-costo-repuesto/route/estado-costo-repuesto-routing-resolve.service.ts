import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from '../estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

@Injectable({ providedIn: 'root' })
export class EstadoCostoRepuestoRoutingResolveService implements Resolve<IEstadoCostoRepuesto> {
  constructor(protected service: EstadoCostoRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoCostoRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoCostoRepuesto: HttpResponse<EstadoCostoRepuesto>) => {
          if (estadoCostoRepuesto.body) {
            return of(estadoCostoRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoCostoRepuesto());
  }
}
