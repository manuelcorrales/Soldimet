jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICobranzaRepuesto, CobranzaRepuesto } from '../cobranza-repuesto.model';
import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';

import { CobranzaRepuestoRoutingResolveService } from './cobranza-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('CobranzaRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CobranzaRepuestoRoutingResolveService;
    let service: CobranzaRepuestoService;
    let resultCobranzaRepuesto: ICobranzaRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CobranzaRepuestoRoutingResolveService);
      service = TestBed.inject(CobranzaRepuestoService);
      resultCobranzaRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return ICobranzaRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCobranzaRepuesto).toEqual({ id: 123 });
      });

      it('should return new ICobranzaRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCobranzaRepuesto).toEqual(new CobranzaRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CobranzaRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCobranzaRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCobranzaRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
