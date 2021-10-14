import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoRepuesto, TipoRepuesto } from '../tipo-repuesto.model';
import { TipoRepuestoService } from '../service/tipo-repuesto.service';

@Injectable({ providedIn: 'root' })
export class TipoRepuestoRoutingResolveService implements Resolve<ITipoRepuesto> {
  constructor(protected service: TipoRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoRepuesto: HttpResponse<TipoRepuesto>) => {
          if (tipoRepuesto.body) {
            return of(tipoRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoRepuesto());
  }
}
