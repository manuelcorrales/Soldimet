jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPagoEfectivo, PagoEfectivo } from '../pago-efectivo.model';
import { PagoEfectivoService } from '../service/pago-efectivo.service';

import { PagoEfectivoRoutingResolveService } from './pago-efectivo-routing-resolve.service';

describe('Service Tests', () => {
  describe('PagoEfectivo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PagoEfectivoRoutingResolveService;
    let service: PagoEfectivoService;
    let resultPagoEfectivo: IPagoEfectivo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PagoEfectivoRoutingResolveService);
      service = TestBed.inject(PagoEfectivoService);
      resultPagoEfectivo = undefined;
    });

    describe('resolve', () => {
      it('should return IPagoEfectivo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoEfectivo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPagoEfectivo).toEqual({ id: 123 });
      });

      it('should return new IPagoEfectivo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoEfectivo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPagoEfectivo).toEqual(new PagoEfectivo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PagoEfectivo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPagoEfectivo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPagoEfectivo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
