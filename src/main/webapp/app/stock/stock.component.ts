import { AlertService } from './../core/util/alert.service';
import { EventManager } from './../core/util/event-manager.service';
import { Component, OnInit } from '@angular/core';
import { DTOStockRepuestoCabecera } from 'app/dto/dto-stock/dto-repuesto';
import { BaseFilterPageableComponent } from '../shared/base-filter-pageable/base-filter-pageable.component';
import { StockService } from './stock.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent extends BaseFilterPageableComponent<DTOStockRepuestoCabecera> implements OnInit {
  eventSubscriber: Subscription;

  constructor(protected alertService: AlertService, protected _stockService: StockService, private eventManager: EventManager) {
    super(alertService);
    this.searchableService = _stockService;
    this.eventSubscriber = this.eventManager.subscribe('stockArticuloListModification', () => this.requestContent());
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addStock(repuesto: DTOStockRepuestoCabecera) {
    repuesto.cantidad += 1;
    this.updateStock(repuesto);
  }

  minusStock(repuesto: DTOStockRepuestoCabecera) {
    repuesto.cantidad -= 1;
    this.updateStock(repuesto);
  }

  updateStock(repuesto: DTOStockRepuestoCabecera) {
    this._stockService.updateStockArticulo(repuesto).subscribe(
      (res: DTOStockRepuestoCabecera) => {
        const i = this.content.findIndex(dto => dto.id === res.id);
        this.content[i] = res;
      },
      (res: HttpErrorResponse) => this.onError(res)
    );
  }
}
