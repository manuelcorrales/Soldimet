import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'app/vendor';
import { AuthInterceptor } from 'app/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from 'app/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from 'app/blocks/interceptor/notification.interceptor';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SoldimetCoreModule } from 'app/core/core.module';
import { SoldimetAppRoutingModule } from 'app/app-routing.module';
import { SoldimetHomeModule } from 'app/home/home.module';
import { SoldimetEntityModule } from 'app/entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from 'app/layouts/main/main.component';
import { NavbarComponent } from 'app/layouts/navbar/navbar.component';
import { FooterComponent } from 'app/layouts/footer/footer.component';
import { PageRibbonComponent } from 'app/layouts/profiles/page-ribbon.component';
import { ErrorComponent } from 'app/layouts/error/error.component';

// Import created modules here
import { CajaModule } from 'app/caja/caja.module';
import { ClientesModule } from 'app/clientes/clientes.module';
import { OperacionesModule } from 'app/operaciones/operaciones.module';
import { PedidosModule } from 'app/pedidos/pedidos.module';
import { PresupuestosModule } from 'app/presupuestos/presupuestos.module';
import { ReportsModule } from 'app/reports/reports.module';
import { RepuestosModule } from 'app/repuestos/repuestos.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,
    BrowserAnimationsModule,
    SoldimetSharedModule,
    SoldimetCoreModule,
    SoldimetHomeModule,
    CajaModule,
    ClientesModule,
    OperacionesModule,
    PedidosModule,
    PresupuestosModule,
    ReportsModule,
    RepuestosModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SoldimetEntityModule,
    SoldimetAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class SoldimetAppModule {}
