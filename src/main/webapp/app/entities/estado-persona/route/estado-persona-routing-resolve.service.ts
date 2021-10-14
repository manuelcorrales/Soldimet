import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEstadoPersona, EstadoPersona } from '../estado-persona.model';
import { EstadoPersonaService } from '../service/estado-persona.service';

@Injectable({ providedIn: 'root' })
export class EstadoPersonaRoutingResolveService implements Resolve<IEstadoPersona> {
  constructor(protected service: EstadoPersonaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstadoPersona> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((estadoPersona: HttpResponse<EstadoPersona>) => {
          if (estadoPersona.body) {
            return of(estadoPersona.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EstadoPersona());
  }
}
