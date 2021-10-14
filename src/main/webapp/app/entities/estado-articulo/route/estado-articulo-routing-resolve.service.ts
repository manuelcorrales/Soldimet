import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoArticulo, EstadoArticulo } from '../estado-articulo.model';
import { EstadoArticuloService } from '../service/estado-articulo.service';

@Injectable({ providedIn: 'root' })
export class EstadoArticuloRoutingResolveService implements Resolve<IEstadoArticulo> {
  constructor(protected service: EstadoArticuloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoArticulo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoArticulo: HttpResponse<EstadoArticulo>) => {
          if (estadoArticulo.body) {
            return of(estadoArticulo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoArticulo());
  }
}
