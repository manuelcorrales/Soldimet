import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';
import { TipoParteMotorComponent } from './tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from './tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from './tipo-parte-motor-update.component';
import { TipoParteMotorDeletePopupComponent } from './tipo-parte-motor-delete-dialog.component';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

@Injectable({ providedIn: 'root' })
export class TipoParteMotorResolve implements Resolve<ITipoParteMotor> {
    constructor(private service: TipoParteMotorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoParteMotor: HttpResponse<TipoParteMotor>) => tipoParteMotor.body));
        }
        return of(new TipoParteMotor());
    }
}

export const tipoParteMotorRoute: Routes = [
    {
        path: 'tipo-parte-motor',
        component: TipoParteMotorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-parte-motor/:id/view',
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
        path: 'tipo-parte-motor/new',
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
        path: 'tipo-parte-motor/:id/edit',
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
        path: 'tipo-parte-motor/:id/delete',
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
