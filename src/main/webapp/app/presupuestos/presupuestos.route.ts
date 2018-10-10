import { Routes } from '@angular/router';

import { PresupuestosComponent } from 'app/presupuestos/presupuestos.component';
import { NuevoPresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/nuevo-presupuesto.component';
import { UserRouteAccessService } from 'app/core';
import { JhiResolvePagingParams } from '../../../../../node_modules/ng-jhipster';

export const PRESUPUESTOS_ROUTES: Routes = [
    {
        path: 'presupuestos',
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: PresupuestosComponent,
                resolve: {
                    pagingParams: JhiResolvePagingParams
                },
                data: {
                    pageTitle: 'Presupuestos',
                    defaultSort: 'id,asc'
                }
            },
            {
                path: 'nuevo',
                component: NuevoPresupuestoComponent,
                data: {
                    pageTitle: 'Nuevo Presupuesto'
                }
            }
        ]
    }
];
