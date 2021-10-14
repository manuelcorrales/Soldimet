import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPrecioRepuesto, PrecioRepuesto } from '../precio-repuesto.model';
import { PrecioRepuestoService } from '../service/precio-repuesto.service';

@Injectable({ providedIn: 'root' })
export class PrecioRepuestoRoutingResolveService implements Resolve<IPrecioRepuesto> {
  constructor(protected service: PrecioRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrecioRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((precioRepuesto: HttpResponse<PrecioRepuesto>) => {
          if (precioRepuesto.body) {
            return of(precioRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PrecioRepuesto());
  }
}
