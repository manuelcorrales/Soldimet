import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICostoRepuesto, CostoRepuesto } from '../costo-repuesto.model';
import { CostoRepuestoService } from '../service/costo-repuesto.service';

@Injectable({ providedIn: 'root' })
export class CostoRepuestoRoutingResolveService implements Resolve<ICostoRepuesto> {
  constructor(protected service: CostoRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICostoRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((costoRepuesto: HttpResponse<CostoRepuesto>) => {
          if (costoRepuesto.body) {
            return of(costoRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CostoRepuesto());
  }
}
