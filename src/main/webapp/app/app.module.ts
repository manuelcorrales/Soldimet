import './vendor.ts';

import { NgModule, Injector, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from 'app/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';
import { SoldimetSharedModule } from 'app/shared';
import { SoldimetCoreModule } from 'app/core';
import { SoldimetAppRoutingModule } from 'app/app-routing.module';
import { SoldimetHomeModule } from 'app/home/home.module';
import { SoldimetAccountModule } from 'app/account/account.module';
import { SoldimetEntityModule } from 'app/entities/entity.module';
import { PresupuestosModule } from 'app/presupuestos';
import { OperacionesModule } from 'app/operaciones';
import { PedidosModule } from 'app/pedidos';
import { ClientesModule } from 'app/clientes';
import { CajaModule } from 'app/caja';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from 'app/layouts';

@NgModule({
    imports: [
        BrowserModule,
        SoldimetAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        SoldimetSharedModule,
        SoldimetCoreModule,
        SoldimetHomeModule,
        SoldimetAccountModule,
        SoldimetEntityModule,
        PresupuestosModule,
        OperacionesModule,
        PedidosModule,
        ClientesModule,
        CajaModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class SoldimetAppModule {}
