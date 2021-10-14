jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAplicacion, Aplicacion } from '../aplicacion.model';
import { AplicacionService } from '../service/aplicacion.service';

import { AplicacionRoutingResolveService } from './aplicacion-routing-resolve.service';

describe('Service Tests', () => {
  describe('Aplicacion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AplicacionRoutingResolveService;
    let service: AplicacionService;
    let resultAplicacion: IAplicacion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AplicacionRoutingResolveService);
      service = TestBed.inject(AplicacionService);
      resultAplicacion = undefined;
    });

    describe('resolve', () => {
      it('should return IAplicacion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAplicacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAplicacion).toEqual({ id: 123 });
      });

      it('should return new IAplicacion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAplicacion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAplicacion).toEqual(new Aplicacion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Aplicacion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAplicacion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAplicacion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
