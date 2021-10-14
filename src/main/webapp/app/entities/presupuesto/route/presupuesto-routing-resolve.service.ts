import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPresupuesto, Presupuesto } from '../presupuesto.model';
import { PresupuestoService } from '../service/presupuesto.service';

@Injectable({ providedIn: 'root' })
export class PresupuestoRoutingResolveService implements Resolve<IPresupuesto> {
  constructor(protected service: PresupuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPresupuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((presupuesto: HttpResponse<Presupuesto>) => {
          if (presupuesto.body) {
            return of(presupuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Presupuesto());
  }
}
