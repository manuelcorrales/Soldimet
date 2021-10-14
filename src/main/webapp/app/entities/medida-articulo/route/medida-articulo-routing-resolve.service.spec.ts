jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMedidaArticulo, MedidaArticulo } from '../medida-articulo.model';
import { MedidaArticuloService } from '../service/medida-articulo.service';

import { MedidaArticuloRoutingResolveService } from './medida-articulo-routing-resolve.service';

describe('Service Tests', () => {
  describe('MedidaArticulo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MedidaArticuloRoutingResolveService;
    let service: MedidaArticuloService;
    let resultMedidaArticulo: IMedidaArticulo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MedidaArticuloRoutingResolveService);
      service = TestBed.inject(MedidaArticuloService);
      resultMedidaArticulo = undefined;
    });

    describe('resolve', () => {
      it('should return IMedidaArticulo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedidaArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedidaArticulo).toEqual({ id: 123 });
      });

      it('should return new IMedidaArticulo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedidaArticulo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMedidaArticulo).toEqual(new MedidaArticulo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MedidaArticulo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMedidaArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMedidaArticulo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
