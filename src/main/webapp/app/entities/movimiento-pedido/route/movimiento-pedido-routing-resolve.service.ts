import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovimientoPedido, MovimientoPedido } from '../movimiento-pedido.model';
import { MovimientoPedidoService } from '../service/movimiento-pedido.service';

@Injectable({ providedIn: 'root' })
export class MovimientoPedidoRoutingResolveService implements Resolve<IMovimientoPedido> {
  constructor(protected service: MovimientoPedidoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientoPedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movimientoPedido: HttpResponse<MovimientoPedido>) => {
          if (movimientoPedido.body) {
            return of(movimientoPedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MovimientoPedido());
  }
}
