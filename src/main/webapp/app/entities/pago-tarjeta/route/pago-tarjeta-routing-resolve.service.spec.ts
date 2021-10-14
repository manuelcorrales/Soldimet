jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPagoTarjeta, PagoTarjeta } from '../pago-tarjeta.model';
import { PagoTarjetaService } from '../service/pago-tarjeta.service';

import { PagoTarjetaRoutingResolveService } from './pago-tarjeta-routing-resolve.service';

describe('Service Tests', () => {
  describe('PagoTarjeta routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PagoTarjetaRoutingResolveService;
    let service: PagoTarjetaService;
    let resultPagoTarjeta: IPagoTarjeta | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PagoTarjetaRoutingResolveService);
      service = TestBed.inject(PagoTarjetaService);
      resultPagoTarjeta = undefined;
    });

    describe('resolve', () => {
      it('should return IPagoTarjeta returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoTarjeta = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPagoTarjeta).toEqual({ id: 123 });
      });

      it('should return new IPagoTarjeta if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoTarjeta = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPagoTarjeta).toEqual(new PagoTarjeta());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PagoTarjeta })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoTarjeta = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPagoTarjeta).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
