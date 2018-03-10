import {Routes} from '@angular/router';

import {PresupuestosComponent} from './presupuestos.component';
import {UserRouteAccessService} from '../shared';
import {NuevoPresupuestoComponent} from "./nuevo-presupuesto/nuevo-presupuesto.component";


export const PRESUPUESTOS_ROUTES: Routes = [{
    path: 'presupuestos',
    data: {
        authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
    children:
        [{
            path: '',
            component: PresupuestosComponent,
            data: {
                pageTitle: 'Presupuestos'
            },
        },
            {
                path: 'nuevo',
                component: NuevoPresupuestoComponent,
                data: {
                    pageTitle: 'Nuevo Presupuesto'
                },
            }]
},

];
