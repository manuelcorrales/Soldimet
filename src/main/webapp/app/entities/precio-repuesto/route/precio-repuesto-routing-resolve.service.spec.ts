jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPrecioRepuesto, PrecioRepuesto } from '../precio-repuesto.model';
import { PrecioRepuestoService } from '../service/precio-repuesto.service';

import { PrecioRepuestoRoutingResolveService } from './precio-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('PrecioRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PrecioRepuestoRoutingResolveService;
    let service: PrecioRepuestoService;
    let resultPrecioRepuesto: IPrecioRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PrecioRepuestoRoutingResolveService);
      service = TestBed.inject(PrecioRepuestoService);
      resultPrecioRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IPrecioRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPrecioRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPrecioRepuesto).toEqual({ id: 123 });
      });

      it('should return new IPrecioRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPrecioRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPrecioRepuesto).toEqual(new PrecioRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PrecioRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPrecioRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPrecioRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
