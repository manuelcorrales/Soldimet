import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICostoOperacion, CostoOperacion } from '../costo-operacion.model';
import { CostoOperacionService } from '../service/costo-operacion.service';

@Injectable({ providedIn: 'root' })
export class CostoOperacionRoutingResolveService implements Resolve<ICostoOperacion> {
  constructor(protected service: CostoOperacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICostoOperacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((costoOperacion: HttpResponse<CostoOperacion>) => {
          if (costoOperacion.body) {
            return of(costoOperacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CostoOperacion());
  }
}
