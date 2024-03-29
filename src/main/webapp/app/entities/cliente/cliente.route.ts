import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { ClienteComponent } from 'app/entities/cliente/cliente.component';
import { ClienteDetailComponent } from 'app/entities/cliente/cliente-detail.component';
import { ClienteUpdateComponent } from 'app/entities/cliente/cliente-update.component';
import { ClienteDeletePopupComponent } from 'app/entities/cliente/cliente-delete-dialog.component';
import { ICliente } from 'app/shared/model/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteResolve implements Resolve<ICliente> {
  constructor(private service: ClienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICliente> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cliente>) => response.ok),
        map((cliente: HttpResponse<Cliente>) => cliente.body)
      );
    }
    return of(new Cliente());
  }
}

export const clienteRoute: Routes = [
  {
    path: '',
    component: ClienteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClienteDetailComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClienteUpdateComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClienteUpdateComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const clientePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClienteDeletePopupComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
