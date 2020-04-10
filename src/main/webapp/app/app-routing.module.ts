import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from 'app/layouts/error/error.route';
import { navbarRoute } from 'app/layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('app/admin/admin.module').then(m => m.SoldimetAdminModule)
        },
        {
          path: 'account',
          loadChildren: () => import('app/account/account.module').then(m => m.SoldimetAccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class SoldimetAppRoutingModule {}
