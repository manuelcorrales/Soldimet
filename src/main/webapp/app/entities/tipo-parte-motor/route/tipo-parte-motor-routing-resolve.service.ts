import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoParteMotor, TipoParteMotor } from '../tipo-parte-motor.model';
import { TipoParteMotorService } from '../service/tipo-parte-motor.service';

@Injectable({ providedIn: 'root' })
export class TipoParteMotorRoutingResolveService implements Resolve<ITipoParteMotor> {
  constructor(protected service: TipoParteMotorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoParteMotor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tipoParteMotor: HttpResponse<TipoParteMotor>) => {
          if (tipoParteMotor.body) {
            return of(tipoParteMotor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoParteMotor());
  }
}
