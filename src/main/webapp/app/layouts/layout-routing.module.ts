import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { navbarRoute } from 'app/layouts/navbar/navbar.route';
import { errorRoute } from 'app/layouts/error/error.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
