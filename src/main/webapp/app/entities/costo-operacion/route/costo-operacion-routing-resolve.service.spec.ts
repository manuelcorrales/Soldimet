jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICostoOperacion, CostoOperacion } from '../costo-operacion.model';
import { CostoOperacionService } from '../service/costo-operacion.service';

import { CostoOperacionRoutingResolveService } from './costo-operacion-routing-resolve.service';

describe('Service Tests', () => {
  describe('CostoOperacion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CostoOperacionRoutingResolveService;
    let service: CostoOperacionService;
    let resultCostoOperacion: ICostoOperacion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CostoOperacionRoutingResolveService);
      service = TestBed.inject(CostoOperacionService);
      resultCostoOperacion = undefined;
    });

    describe('resolve', () => {
      it('should return ICostoOperacion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCostoOperacion).toEqual({ id: 123 });
      });

      it('should return new ICostoOperacion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoOperacion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCostoOperacion).toEqual(new CostoOperacion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CostoOperacion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCostoOperacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCostoOperacion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
