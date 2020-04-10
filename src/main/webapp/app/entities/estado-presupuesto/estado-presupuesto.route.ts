import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';
import { EstadoPresupuestoComponent } from 'app/entities/estado-presupuesto/estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-update.component';
import { EstadoPresupuestoDeletePopupComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-delete-dialog.component';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoPresupuestoResolve implements Resolve<IEstadoPresupuesto> {
  constructor(private service: EstadoPresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoPresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoPresupuesto>) => response.ok),
        map((estadoPresupuesto: HttpResponse<EstadoPresupuesto>) => estadoPresupuesto.body)
      );
    }
    return of(new EstadoPresupuesto());
  }
}

export const estadoPresupuestoRoute: Routes = [
  {
    path: '',
    component: EstadoPresupuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoPresupuestoDetailComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoPresupuestoUpdateComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoPresupuestoUpdateComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoPresupuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoPresupuestoDeletePopupComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoPresupuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
