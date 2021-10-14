import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMedidaArticulo, MedidaArticulo } from '../medida-articulo.model';
import { MedidaArticuloService } from '../service/medida-articulo.service';

@Injectable({ providedIn: 'root' })
export class MedidaArticuloRoutingResolveService implements Resolve<IMedidaArticulo> {
  constructor(protected service: MedidaArticuloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedidaArticulo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((medidaArticulo: HttpResponse<MedidaArticulo>) => {
          if (medidaArticulo.body) {
            return of(medidaArticulo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MedidaArticulo());
  }
}
