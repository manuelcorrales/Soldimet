import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';

import { PasswordStrengthBarComponent } from 'app/account/password/password-strength-bar.component';
import { RegisterComponent } from 'app/account/register/register.component';
import { ActivateComponent } from 'app/account/activate/activate.component';
import { PasswordComponent } from 'app/account/password/password.component';
import { PasswordResetInitComponent } from 'app/account/password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from 'app/account/password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from 'app/account/settings/settings.component';
import { accountState } from 'app/account/account.route';

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent
  ]
})
export class SoldimetAccountModule {}
