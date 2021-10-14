import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoPedidoRepuesto, EstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';

@Injectable({ providedIn: 'root' })
export class EstadoPedidoRepuestoRoutingResolveService implements Resolve<IEstadoPedidoRepuesto> {
  constructor(protected service: EstadoPedidoRepuestoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoPedidoRepuesto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoPedidoRepuesto: HttpResponse<EstadoPedidoRepuesto>) => {
          if (estadoPedidoRepuesto.body) {
            return of(estadoPedidoRepuesto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoPedidoRepuesto());
  }
}
