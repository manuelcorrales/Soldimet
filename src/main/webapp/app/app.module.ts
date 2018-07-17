import './vendor.ts';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {SoldimetSharedModule, UserRouteAccessService} from './shared';
import {SoldimetHomeModule} from './home/home.module';
import {SoldimetAdminModule} from './admin/admin.module';
import {SoldimetAccountModule} from './account/account.module';
import {SoldimetEntityModule} from './entities/entity.module';

import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';

import {HttpClientModule} from '@angular/common/http';
import {
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import { PresupuestosModule } from './presupuestos/presupuestos.module';
import { CajaModule } from './caja/caja.module';
import { ClientesModule } from './clientes/clientes.module';
import { OperacionesModule } from './operaciones/operaciones.module';
import {  PedidosModule } from './pedidos/pedidos.module';
import { DtoModule} from './dto/dto.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        PresupuestosModule,
        CajaModule,
        ClientesModule,
        OperacionesModule,
        PedidosModule,
        DtoModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        SoldimetSharedModule,
        SoldimetHomeModule,
        SoldimetAdminModule,
        SoldimetAccountModule,
        SoldimetEntityModule,

        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class SoldimetAppModule {
}
