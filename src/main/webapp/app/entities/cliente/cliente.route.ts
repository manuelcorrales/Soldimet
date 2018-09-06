import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cliente: HttpResponse<Cliente>) => cliente.body));
        }
        return of(new Cliente());
    }
}

export const clienteRoute: Routes = [
    {
        path: 'cliente',
        component: ClienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cliente/:id/view',
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
        path: 'cliente/new',
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
        path: 'cliente/:id/edit',
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
        path: 'cliente/:id/delete',
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
