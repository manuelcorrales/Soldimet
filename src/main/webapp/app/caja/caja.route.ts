import { Route, Routes } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CajaComponent } from 'app/caja/caja.component';
import { UserRouteAccessService } from 'app/core';
import { NuevoMovimientoComponent } from 'app/caja/nuevo-movimiento/nuevo-movimiento.component';

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
            }
        ]
    }
];
