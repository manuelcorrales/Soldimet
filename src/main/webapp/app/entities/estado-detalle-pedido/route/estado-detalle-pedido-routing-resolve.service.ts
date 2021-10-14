import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoDetallePedido, EstadoDetallePedido } from '../estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';

@Injectable({ providedIn: 'root' })
export class EstadoDetallePedidoRoutingResolveService implements Resolve<IEstadoDetallePedido> {
  constructor(protected service: EstadoDetallePedidoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoDetallePedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoDetallePedido: HttpResponse<EstadoDetallePedido>) => {
          if (estadoDetallePedido.body) {
            return of(estadoDetallePedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoDetallePedido());
  }
}
