import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { EmpleadoComponent } from 'app/entities/empleado/empleado.component';
import { EmpleadoDetailComponent } from 'app/entities/empleado/empleado-detail.component';
import { EmpleadoUpdateComponent } from 'app/entities/empleado/empleado-update.component';
import { EmpleadoDeletePopupComponent } from 'app/entities/empleado/empleado-delete-dialog.component';
import { IEmpleado } from 'app/shared/model/empleado.model';

@Injectable({ providedIn: 'root' })
export class EmpleadoResolve implements Resolve<IEmpleado> {
  constructor(private service: EmpleadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmpleado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Empleado>) => response.ok),
        map((empleado: HttpResponse<Empleado>) => empleado.body)
      );
    }
    return of(new Empleado());
  }
}

export const empleadoRoute: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Empleados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
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
    path: 'new',
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
    path: ':id/edit',
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
    path: ':id/delete',
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
