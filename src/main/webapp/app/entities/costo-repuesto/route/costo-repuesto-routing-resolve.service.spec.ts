jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICostoRepuesto, CostoRepuesto } from '../costo-repuesto.model';
import { CostoRepuestoService } from '../service/costo-repuesto.service';

import { CostoRepuestoRoutingResolveService } from './costo-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('CostoRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CostoRepuestoRoutingResolveService;
    let service: CostoRepuestoService;
    let resultCostoRepuesto: ICostoRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CostoRepuestoRoutingResolveService);
      service = TestBed.inject(CostoRepuestoService);
      resultCostoRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return ICostoRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCostoRepuesto).toEqual({ id: 123 });
      });

      it('should return new ICostoRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCostoRepuesto).toEqual(new CostoRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CostoRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCostoRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
