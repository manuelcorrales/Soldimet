import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MotorComponent } from '../list/motor.component';
import { MotorDetailComponent } from '../detail/motor-detail.component';
import { MotorUpdateComponent } from '../update/motor-update.component';
import { MotorRoutingResolveService } from './motor-routing-resolve.service';

const motorRoute: Routes = [
  {
    path: '',
    component: MotorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MotorDetailComponent,
    resolve: {
      motor: MotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MotorUpdateComponent,
    resolve: {
      motor: MotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MotorUpdateComponent,
    resolve: {
      motor: MotorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(motorRoute)],
  exports: [RouterModule],
})
export class MotorRoutingModule {}
