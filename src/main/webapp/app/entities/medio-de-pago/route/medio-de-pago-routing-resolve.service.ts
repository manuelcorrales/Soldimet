import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMedioDePago, MedioDePago } from '../medio-de-pago.model';
import { MedioDePagoService } from '../service/medio-de-pago.service';

@Injectable({ providedIn: 'root' })
export class MedioDePagoRoutingResolveService implements Resolve<IMedioDePago> {
  constructor(protected service: MedioDePagoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedioDePago> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((medioDePago: HttpResponse<MedioDePago>) => {
          if (medioDePago.body) {
            return of(medioDePago.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedioDePago());
  }
}
