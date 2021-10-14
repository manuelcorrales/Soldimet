import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPagoCheque, PagoCheque } from '../pago-cheque.model';
import { PagoChequeService } from '../service/pago-cheque.service';

@Injectable({ providedIn: 'root' })
export class PagoChequeRoutingResolveService implements Resolve<IPagoCheque> {
  constructor(protected service: PagoChequeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPagoCheque> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pagoCheque: HttpResponse<PagoCheque>) => {
          if (pagoCheque.body) {
            return of(pagoCheque.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PagoCheque());
  }
}
