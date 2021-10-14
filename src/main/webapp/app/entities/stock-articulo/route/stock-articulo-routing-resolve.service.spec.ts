jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStockArticulo, StockArticulo } from '../stock-articulo.model';
import { StockArticuloService } from '../service/stock-articulo.service';

import { StockArticuloRoutingResolveService } from './stock-articulo-routing-resolve.service';

describe('Service Tests', () => {
  describe('StockArticulo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: StockArticuloRoutingResolveService;
    let service: StockArticuloService;
    let resultStockArticulo: IStockArticulo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(StockArticuloRoutingResolveService);
      service = TestBed.inject(StockArticuloService);
      resultStockArticulo = undefined;
    });

    describe('resolve', () => {
      it('should return IStockArticulo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStockArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultStockArticulo).toEqual({ id: 123 });
      });

      it('should return new IStockArticulo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStockArticulo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultStockArticulo).toEqual(new StockArticulo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as StockArticulo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStockArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultStockArticulo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
