import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAplicacion, Aplicacion } from '../aplicacion.model';
import { AplicacionService } from '../service/aplicacion.service';

@Injectable({ providedIn: 'root' })
export class AplicacionRoutingResolveService implements Resolve<IAplicacion> {
  constructor(protected service: AplicacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAplicacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((aplicacion: HttpResponse<Aplicacion>) => {
          if (aplicacion.body) {
            return of(aplicacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Aplicacion());
  }
}
