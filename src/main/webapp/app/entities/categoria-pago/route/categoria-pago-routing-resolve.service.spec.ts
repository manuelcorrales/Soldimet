jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICategoriaPago, CategoriaPago } from '../categoria-pago.model';
import { CategoriaPagoService } from '../service/categoria-pago.service';

import { CategoriaPagoRoutingResolveService } from './categoria-pago-routing-resolve.service';

describe('Service Tests', () => {
  describe('CategoriaPago routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CategoriaPagoRoutingResolveService;
    let service: CategoriaPagoService;
    let resultCategoriaPago: ICategoriaPago | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CategoriaPagoRoutingResolveService);
      service = TestBed.inject(CategoriaPagoService);
      resultCategoriaPago = undefined;
    });

    describe('resolve', () => {
      it('should return ICategoriaPago returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCategoriaPago = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCategoriaPago).toEqual({ id: 123 });
      });

      it('should return new ICategoriaPago if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCategoriaPago = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCategoriaPago).toEqual(new CategoriaPago());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CategoriaPago })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCategoriaPago = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCategoriaPago).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
