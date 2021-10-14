jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMovimientoArticulo, MovimientoArticulo } from '../movimiento-articulo.model';
import { MovimientoArticuloService } from '../service/movimiento-articulo.service';

import { MovimientoArticuloRoutingResolveService } from './movimiento-articulo-routing-resolve.service';

describe('Service Tests', () => {
  describe('MovimientoArticulo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MovimientoArticuloRoutingResolveService;
    let service: MovimientoArticuloService;
    let resultMovimientoArticulo: IMovimientoArticulo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MovimientoArticuloRoutingResolveService);
      service = TestBed.inject(MovimientoArticuloService);
      resultMovimientoArticulo = undefined;
    });

    describe('resolve', () => {
      it('should return IMovimientoArticulo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimientoArticulo).toEqual({ id: 123 });
      });

      it('should return new IMovimientoArticulo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoArticulo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMovimientoArticulo).toEqual(new MovimientoArticulo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MovimientoArticulo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMovimientoArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMovimientoArticulo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
