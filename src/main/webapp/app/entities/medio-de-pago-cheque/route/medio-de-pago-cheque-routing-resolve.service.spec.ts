jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMedioDePagoCheque, MedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';

import { MedioDePagoChequeRoutingResolveService } from './medio-de-pago-cheque-routing-resolve.service';

describe('Service Tests', () => {
  describe('MedioDePagoCheque routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MedioDePagoChequeRoutingResolveService;
    let service: MedioDePagoChequeService;
    let resultMedioDePagoCheque: IMedioDePagoCheque | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MedioDePagoChequeRoutingResolveService);
      service = TestBed.inject(MedioDePagoChequeService);
      resultMedioDePagoCheque = undefined;
    });

    describe('resolve', () => {
      it('should return IMedioDePagoCheque returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePagoCheque = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedioDePagoCheque).toEqual({ id: 123 });
      });

      it('should return new IMedioDePagoCheque if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePagoCheque = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMedioDePagoCheque).toEqual(new MedioDePagoCheque());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MedioDePagoCheque })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePagoCheque = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedioDePagoCheque).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
