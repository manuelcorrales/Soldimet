import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';
import { EstadoCostoRepuestoComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.component';
import { EstadoCostoRepuestoDetailComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuestoUpdateComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-update.component';
import { EstadoCostoRepuestoDeletePopupComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-delete-dialog.component';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoCostoRepuestoResolve implements Resolve<IEstadoCostoRepuesto> {
  constructor(private service: EstadoCostoRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoCostoRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoCostoRepuesto>) => response.ok),
        map((estadoCostoRepuesto: HttpResponse<EstadoCostoRepuesto>) => estadoCostoRepuesto.body)
      );
    }
    return of(new EstadoCostoRepuesto());
  }
}

export const estadoCostoRepuestoRoute: Routes = [
  {
    path: '',
    component: EstadoCostoRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoCostoRepuestoDetailComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoCostoRepuestoUpdateComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoCostoRepuestoUpdateComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoCostoRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoCostoRepuestoDeletePopupComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCostoRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
