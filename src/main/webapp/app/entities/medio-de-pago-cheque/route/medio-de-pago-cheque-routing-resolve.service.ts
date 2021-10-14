import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMedioDePagoCheque, MedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';

@Injectable({ providedIn: 'root' })
export class MedioDePagoChequeRoutingResolveService implements Resolve<IMedioDePagoCheque> {
  constructor(protected service: MedioDePagoChequeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedioDePagoCheque> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((medioDePagoCheque: HttpResponse<MedioDePagoCheque>) => {
          if (medioDePagoCheque.body) {
            return of(medioDePagoCheque.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedioDePagoCheque());
  }
}
