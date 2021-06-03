import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { StockArticuloComponent } from './stock-articulo.component';
import { StockArticuloDetailComponent } from './stock-articulo-detail.component';
import { StockArticuloUpdateComponent } from './stock-articulo-update.component';
import { StockArticuloDeletePopupComponent, StockArticuloDeleteDialogComponent } from './stock-articulo-delete-dialog.component';
import { stockArticuloRoute, stockArticuloPopupRoute } from './stock-articulo.route';

const ENTITY_STATES = [...stockArticuloRoute, ...stockArticuloPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StockArticuloComponent,
    StockArticuloDetailComponent,
    StockArticuloUpdateComponent,
    StockArticuloDeleteDialogComponent,
    StockArticuloDeletePopupComponent
  ],
  entryComponents: [
    StockArticuloComponent,
    StockArticuloUpdateComponent,
    StockArticuloDeleteDialogComponent,
    StockArticuloDeletePopupComponent
  ]
})
export class SoldimetStockArticuloModule {}
