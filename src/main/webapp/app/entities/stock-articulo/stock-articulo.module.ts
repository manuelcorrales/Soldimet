import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StockArticuloComponent } from './list/stock-articulo.component';
import { StockArticuloDetailComponent } from './detail/stock-articulo-detail.component';
import { StockArticuloUpdateComponent } from './update/stock-articulo-update.component';
import { StockArticuloDeleteDialogComponent } from './delete/stock-articulo-delete-dialog.component';
import { StockArticuloRoutingModule } from './route/stock-articulo-routing.module';

@NgModule({
  imports: [SharedModule, StockArticuloRoutingModule],
  declarations: [StockArticuloComponent, StockArticuloDetailComponent, StockArticuloUpdateComponent, StockArticuloDeleteDialogComponent],
  entryComponents: [StockArticuloDeleteDialogComponent],
})
export class StockArticuloModule {}
