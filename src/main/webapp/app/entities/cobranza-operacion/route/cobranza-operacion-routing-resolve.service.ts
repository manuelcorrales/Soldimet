import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICobranzaOperacion, CobranzaOperacion } from '../cobranza-operacion.model';
import { CobranzaOperacionService } from '../service/cobranza-operacion.service';

@Injectable({ providedIn: 'root' })
export class CobranzaOperacionRoutingResolveService implements Resolve<ICobranzaOperacion> {
  constructor(protected service: CobranzaOperacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICobranzaOperacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cobranzaOperacion: HttpResponse<CobranzaOperacion>) => {
          if (cobranzaOperacion.body) {
            return of(cobranzaOperacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CobranzaOperacion());
  }
}
