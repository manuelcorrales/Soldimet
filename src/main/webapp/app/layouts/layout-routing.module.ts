import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from 'app/layouts';
import { navbarRoute } from 'app/layouts/navbar/navbar.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
