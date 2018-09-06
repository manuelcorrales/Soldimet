import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Motor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';
import { MotorComponent } from 'app/entities/motor/motor.component';
import { MotorDetailComponent } from 'app/entities/motor/motor-detail.component';
import { MotorUpdateComponent } from 'app/entities/motor/motor-update.component';
import { MotorDeletePopupComponent } from 'app/entities/motor/motor-delete-dialog.component';
import { IMotor } from 'app/shared/model/motor.model';

@Injectable({ providedIn: 'root' })
export class MotorResolve implements Resolve<IMotor> {
    constructor(private service: MotorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((motor: HttpResponse<Motor>) => motor.body));
        }
        return of(new Motor());
    }
}

export const motorRoute: Routes = [
    {
        path: 'motor',
        component: MotorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'motor/:id/view',
        component: MotorDetailComponent,
        resolve: {
            motor: MotorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'motor/new',
        component: MotorUpdateComponent,
        resolve: {
            motor: MotorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'motor/:id/edit',
        component: MotorUpdateComponent,
        resolve: {
            motor: MotorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motorPopupRoute: Routes = [
    {
        path: 'motor/:id/delete',
        component: MotorDeletePopupComponent,
        resolve: {
            motor: MotorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
