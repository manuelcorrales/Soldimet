import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from 'app/home/home.route';
import { HomeComponent } from 'app/home/home.component';

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class SoldimetHomeModule {}
