import { RepuestosService } from 'app/repuestos/repuestos-services';
import { StockComponent } from './stock.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockService } from './stock.service';
import { STOCK_ROUTES, STOCK_POPUP_ROUTE } from './stock.route';
import { SharedModule } from '../shared/shared.module';
import { CreateUpdateStockComponent } from './create-update-stock/create-update-stock.component';
import { StockModalPopupComponent, StockModalPopupService } from './create-update-stock/stock-popup-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const STOCK_ROUTES_ALL = [...STOCK_ROUTES, ...STOCK_POPUP_ROUTE];

@NgModule({
  imports: [SharedModule, NgbModule, CommonModule, BrowserModule, FormsModule, RouterModule.forChild(STOCK_ROUTES_ALL)],
  declarations: [StockComponent, CreateUpdateStockComponent, StockModalPopupComponent],
  entryComponents: [StockComponent, CreateUpdateStockComponent],
  exports: [RouterModule],
  providers: [RepuestosService, StockService, StockModalPopupService],
})
export class StockModule {}
