import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPedidoRepuesto, PedidoRepuesto } from '../pedido-repuesto.model';
import { PedidoRepuestoService } from '../service/pedido-repuesto.service';

@Injectable({ providedIn: 'root' })
export class PedidoRepuestoRoutingResolveService implements Resolve<IPedidoRepuesto> {
  constructor(protected service: PedidoRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPedidoRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pedidoRepuesto: HttpResponse<PedidoRepuesto>) => {
          if (pedidoRepuesto.body) {
            return of(pedidoRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PedidoRepuesto());
  }
}
