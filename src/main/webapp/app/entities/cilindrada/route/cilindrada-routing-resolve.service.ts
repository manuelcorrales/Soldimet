import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICilindrada, Cilindrada } from '../cilindrada.model';
import { CilindradaService } from '../service/cilindrada.service';

@Injectable({ providedIn: 'root' })
export class CilindradaRoutingResolveService implements Resolve<ICilindrada> {
  constructor(protected service: CilindradaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICilindrada> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cilindrada: HttpResponse<Cilindrada>) => {
          if (cilindrada.body) {
            return of(cilindrada.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cilindrada());
  }
}
