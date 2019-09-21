import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SoldimetCoreModule } from 'app/core/core.module';
import { SoldimetAppRoutingModule } from './app-routing.module';
import { SoldimetHomeModule } from './home/home.module';
import { SoldimetEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

// Import created modules here
import { CajaModule } from './caja/caja.module';
import { ClientesModule } from './clientes/clientes.module';
import { OperacionesModule } from './operaciones/operaciones.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PresupuestosModule } from './presupuestos/presupuestos.module';

@NgModule({
  imports: [
    BrowserModule,
    SoldimetSharedModule,
    SoldimetCoreModule,
    SoldimetHomeModule,
    CajaModule,
    ClientesModule,
    OperacionesModule,
    PedidosModule,
    PresupuestosModule,
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
