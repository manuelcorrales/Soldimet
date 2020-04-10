import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';
import { TipoParteMotorComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-update.component';
import { TipoParteMotorDeletePopupComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-delete-dialog.component';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

@Injectable({ providedIn: 'root' })
export class TipoParteMotorResolve implements Resolve<ITipoParteMotor> {
  constructor(private service: TipoParteMotorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoParteMotor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoParteMotor>) => response.ok),
        map((tipoParteMotor: HttpResponse<TipoParteMotor>) => tipoParteMotor.body)
      );
    }
    return of(new TipoParteMotor());
  }
}

export const tipoParteMotorRoute: Routes = [
  {
    path: '',
    component: TipoParteMotorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoParteMotors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoParteMotorDetailComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoParteMotors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoParteMotorUpdateComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoParteMotors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoParteMotorUpdateComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoParteMotors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoParteMotorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoParteMotorDeletePopupComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoParteMotors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
