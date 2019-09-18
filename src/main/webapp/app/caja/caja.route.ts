import { Route, Routes } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CajaComponent } from 'app/caja/caja.component';
import { UserRouteAccessService } from 'app/core';
import { NuevoMovimientoComponent } from 'app/caja/nuevo-movimiento/nuevo-movimiento.component';
import { BorrarMovimientoPopupComponent } from 'app/caja/borrar-movimiento/borrar-movimiento.component';

export const CAJAS_ROUTE: Routes = [
    {
        path: 'cajas',
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: CajaComponent
            },
            {
                path: 'nuevo_movimiento',
                component: NuevoMovimientoComponent,
                data: {
                    pageTitle: 'Nuevo Movimiento'
                }
            },
            {
                path: 'editar_movimiento',
                component: NuevoMovimientoComponent,
                data: {
                    pageTitle: 'Nuevo Movimiento'
                }
            }
        ]
    }
];

export const CAJA_POPUP_ROUTES: Routes = [
    {
        path: 'cajas/:id/eliminar_movimiento',
        component: BorrarMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_JEFE', 'ROLE_ADMIN'],
            pageTitle: 'Eliminar movimiento'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
