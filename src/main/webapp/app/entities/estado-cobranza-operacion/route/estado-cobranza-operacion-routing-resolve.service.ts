import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';

@Injectable({ providedIn: 'root' })
export class EstadoCobranzaOperacionRoutingResolveService implements Resolve<IEstadoCobranzaOperacion> {
  constructor(protected service: EstadoCobranzaOperacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoCobranzaOperacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoCobranzaOperacion: HttpResponse<EstadoCobranzaOperacion>) => {
          if (estadoCobranzaOperacion.body) {
            return of(estadoCobranzaOperacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoCobranzaOperacion());
  }
}
