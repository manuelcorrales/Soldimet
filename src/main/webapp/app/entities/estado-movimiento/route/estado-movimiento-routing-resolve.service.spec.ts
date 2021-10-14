jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoMovimiento, EstadoMovimiento } from '../estado-movimiento.model';
import { EstadoMovimientoService } from '../service/estado-movimiento.service';

import { EstadoMovimientoRoutingResolveService } from './estado-movimiento-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoMovimiento routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoMovimientoRoutingResolveService;
    let service: EstadoMovimientoService;
    let resultEstadoMovimiento: IEstadoMovimiento | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoMovimientoRoutingResolveService);
      service = TestBed.inject(EstadoMovimientoService);
      resultEstadoMovimiento = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoMovimiento returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoMovimiento).toEqual({ id: 123 });
      });

      it('should return new IEstadoMovimiento if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoMovimiento = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoMovimiento).toEqual(new EstadoMovimiento());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoMovimiento })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoMovimiento).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
