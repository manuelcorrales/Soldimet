import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBanco, Banco } from '../banco.model';
import { BancoService } from '../service/banco.service';

@Injectable({ providedIn: 'root' })
export class BancoRoutingResolveService implements Resolve<IBanco> {
  constructor(protected service: BancoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBanco> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((banco: HttpResponse<Banco>) => {
          if (banco.body) {
            return of(banco.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Banco());
  }
}
