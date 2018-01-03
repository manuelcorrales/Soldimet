import './vendor.ts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { SoldimetSharedModule, UserRouteAccessService } from './shared';
import { SoldimetHomeModule } from './home/home.module';
import { SoldimetAdminModule } from './admin/admin.module';
import { SoldimetAccountModule } from './account/account.module';
import { SoldimetEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import {PresupuestosModule} from "./presupuestos/presupuestos.module";
import {CajaModule} from "./caja/caja.module";
import {ClientesModule} from "./clientes/clientes.module";
import {OperacionesModule} from "./operaciones/operaciones.module";
import {RepuestosModule} from "./repuestos/repuestos.module";

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SoldimetSharedModule,
        SoldimetHomeModule,
        SoldimetAdminModule,
        SoldimetAccountModule,
        SoldimetEntityModule,
        PresupuestosModule,
        CajaModule,
        ClientesModule,
        OperacionesModule,
        RepuestosModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SoldimetAppModule {}
