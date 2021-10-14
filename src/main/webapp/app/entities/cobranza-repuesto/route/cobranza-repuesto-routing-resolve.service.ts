import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICobranzaRepuesto, CobranzaRepuesto } from '../cobranza-repuesto.model';
import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoRoutingResolveService implements Resolve<ICobranzaRepuesto> {
  constructor(protected service: CobranzaRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICobranzaRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cobranzaRepuesto: HttpResponse<CobranzaRepuesto>) => {
          if (cobranzaRepuesto.body) {
            return of(cobranzaRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CobranzaRepuesto());
  }
}
