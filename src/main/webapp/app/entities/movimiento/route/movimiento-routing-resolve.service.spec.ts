jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMovimiento, Movimiento } from '../movimiento.model';
import { MovimientoService } from '../service/movimiento.service';

import { MovimientoRoutingResolveService } from './movimiento-routing-resolve.service';

describe('Service Tests', () => {
  describe('Movimiento routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MovimientoRoutingResolveService;
    let service: MovimientoService;
    let resultMovimiento: IMovimiento | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MovimientoRoutingResolveService);
      service = TestBed.inject(MovimientoService);
      resultMovimiento = undefined;
    });

    describe('resolve', () => {
      it('should return IMovimiento returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimiento).toEqual({ id: 123 });
      });

      it('should return new IMovimiento if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimiento = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMovimiento).toEqual(new Movimiento());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Movimiento })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimiento = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimiento).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
