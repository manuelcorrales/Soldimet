import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoUpdateComponent } from './empleado-update.component';
import { EmpleadoDeletePopupComponent } from './empleado-delete-dialog.component';
import { IEmpleado } from 'app/shared/model/empleado.model';

@Injectable({ providedIn: 'root' })
export class EmpleadoResolve implements Resolve<IEmpleado> {
    constructor(private service: EmpleadoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((empleado: HttpResponse<Empleado>) => empleado.body));
        }
        return of(new Empleado());
    }
}

export const empleadoRoute: Routes = [
    {
        path: 'empleado',
        component: EmpleadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'empleado/:id/view',
        component: EmpleadoDetailComponent,
        resolve: {
            empleado: EmpleadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'empleado/new',
        component: EmpleadoUpdateComponent,
        resolve: {
            empleado: EmpleadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'empleado/:id/edit',
        component: EmpleadoUpdateComponent,
        resolve: {
            empleado: EmpleadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empleadoPopupRoute: Routes = [
    {
        path: 'empleado/:id/delete',
        component: EmpleadoDeletePopupComponent,
        resolve: {
            empleado: EmpleadoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
