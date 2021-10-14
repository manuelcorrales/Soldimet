jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMedioDePago, MedioDePago } from '../medio-de-pago.model';
import { MedioDePagoService } from '../service/medio-de-pago.service';

import { MedioDePagoRoutingResolveService } from './medio-de-pago-routing-resolve.service';

describe('Service Tests', () => {
  describe('MedioDePago routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MedioDePagoRoutingResolveService;
    let service: MedioDePagoService;
    let resultMedioDePago: IMedioDePago | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MedioDePagoRoutingResolveService);
      service = TestBed.inject(MedioDePagoService);
      resultMedioDePago = undefined;
    });

    describe('resolve', () => {
      it('should return IMedioDePago returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePago = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedioDePago).toEqual({ id: 123 });
      });

      it('should return new IMedioDePago if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePago = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMedioDePago).toEqual(new MedioDePago());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MedioDePago })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedioDePago = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedioDePago).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
