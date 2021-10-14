jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDireccion, Direccion } from '../direccion.model';
import { DireccionService } from '../service/direccion.service';

import { DireccionRoutingResolveService } from './direccion-routing-resolve.service';

describe('Service Tests', () => {
  describe('Direccion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DireccionRoutingResolveService;
    let service: DireccionService;
    let resultDireccion: IDireccion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DireccionRoutingResolveService);
      service = TestBed.inject(DireccionService);
      resultDireccion = undefined;
    });

    describe('resolve', () => {
      it('should return IDireccion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDireccion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDireccion).toEqual({ id: 123 });
      });

      it('should return new IDireccion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDireccion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDireccion).toEqual(new Direccion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Direccion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDireccion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDireccion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
