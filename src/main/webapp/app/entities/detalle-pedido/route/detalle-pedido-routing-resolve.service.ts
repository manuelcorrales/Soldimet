import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDetallePedido, DetallePedido } from '../detalle-pedido.model';
import { DetallePedidoService } from '../service/detalle-pedido.service';

@Injectable({ providedIn: 'root' })
export class DetallePedidoRoutingResolveService implements Resolve<IDetallePedido> {
  constructor(protected service: DetallePedidoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetallePedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((detallePedido: HttpResponse<DetallePedido>) => {
          if (detallePedido.body) {
            return of(detallePedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetallePedido());
  }
}
