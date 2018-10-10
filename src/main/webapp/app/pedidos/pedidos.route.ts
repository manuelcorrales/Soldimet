import { Route, Routes } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidosComponent } from 'app/pedidos/pedidos.component';
import { UserRouteAccessService } from 'app/core';
import { PedidosPendientesComponent } from 'app/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidoRepuestoResolve } from 'app/entities/pedido-repuesto';

export const PEDIDOS_SUBROUTES: Routes = [
    {
        path: 'pedidos',
        component: PedidosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        },
        children: [
            {
                path: 'pendientes/:id',
                component: PedidosPendientesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Pedidos Pendientes'
                },
                canActivate: [UserRouteAccessService]
            }
        ]

        //     {
        //         path: 'pedido-repuesto/:id/view',
        //         component: PedidoRepuestoDetailComponent,
        //         resolve: {
        //             pedidoRepuesto: PedidoRepuestoResolve
        //         },
        //         data: {
        //             authorities: ['ROLE_USER'],
        //             pageTitle: 'PedidoRepuestos'
        //         },
        //         canActivate: [UserRouteAccessService]
        //     },
        //     {
        //         path: 'pedido-repuesto/new',
        //         component: PedidoRepuestoUpdateComponent,
        //         resolve: {
        //             pedidoRepuesto: PedidoRepuestoResolve
        //         },
        //         data: {
        //             authorities: ['ROLE_USER'],
        //             pageTitle: 'PedidoRepuestos'
        //         },
        //         canActivate: [UserRouteAccessService]
        //     },
        //     {
        //         path: 'pedido-repuesto/:id/edit',
        //         component: PedidoRepuestoUpdateComponent,
        //         resolve: {
        //             pedidoRepuesto: PedidoRepuestoResolve
        //         },
        //         data: {
        //             authorities: ['ROLE_USER'],
        //             pageTitle: 'PedidoRepuestos'
        //         },
        //         canActivate: [UserRouteAccessService]
        //     }
    }
];
