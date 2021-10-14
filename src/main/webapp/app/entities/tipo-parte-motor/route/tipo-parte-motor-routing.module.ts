import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoParteMotorComponent } from '../list/tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from '../detail/tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from '../update/tipo-parte-motor-update.component';
import { TipoParteMotorRoutingResolveService } from './tipo-parte-motor-routing-resolve.service';

const tipoParteMotorRoute: Routes = [
  {
    path: '',
    component: TipoParteMotorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoParteMotorDetailComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoParteMotorUpdateComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoParteMotorUpdateComponent,
    resolve: {
      tipoParteMotor: TipoParteMotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoParteMotorRoute)],
  exports: [RouterModule],
})
export class TipoParteMotorRoutingModule {}
