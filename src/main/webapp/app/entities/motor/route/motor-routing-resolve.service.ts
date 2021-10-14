import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMotor, Motor } from '../motor.model';
import { MotorService } from '../service/motor.service';

@Injectable({ providedIn: 'root' })
export class MotorRoutingResolveService implements Resolve<IMotor> {
  constructor(protected service: MotorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMotor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((motor: HttpResponse<Motor>) => {
          if (motor.body) {
            return of(motor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Motor());
  }
}
