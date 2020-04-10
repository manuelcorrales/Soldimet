import { NgModule } from '@angular/core';
import { SoldimetSharedLibsModule } from './shared-libs.module';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { ModalUtilComponent } from './util/modal-util';


@NgModule({
  imports: [SoldimetSharedLibsModule],
  declarations: [
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ModalUtilComponent,
    ModalUtilComponent
  ],
  entryComponents: [JhiLoginModalComponent, ModalUtilComponent],
  exports: [
    SoldimetSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ModalUtilComponent
  ]
})
export class SoldimetSharedModule {}
