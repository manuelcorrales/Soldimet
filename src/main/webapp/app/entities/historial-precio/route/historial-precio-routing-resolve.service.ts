import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHistorialPrecio, HistorialPrecio } from '../historial-precio.model';
import { HistorialPrecioService } from '../service/historial-precio.service';

@Injectable({ providedIn: 'root' })
export class HistorialPrecioRoutingResolveService implements Resolve<IHistorialPrecio> {
  constructor(protected service: HistorialPrecioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistorialPrecio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((historialPrecio: HttpResponse<HistorialPrecio>) => {
          if (historialPrecio.body) {
            return of(historialPrecio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistorialPrecio());
  }
}
