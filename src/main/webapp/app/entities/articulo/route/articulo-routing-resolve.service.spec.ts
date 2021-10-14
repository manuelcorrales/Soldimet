jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IArticulo, Articulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';

import { ArticuloRoutingResolveService } from './articulo-routing-resolve.service';

describe('Service Tests', () => {
  describe('Articulo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ArticuloRoutingResolveService;
    let service: ArticuloService;
    let resultArticulo: IArticulo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ArticuloRoutingResolveService);
      service = TestBed.inject(ArticuloService);
      resultArticulo = undefined;
    });

    describe('resolve', () => {
      it('should return IArticulo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultArticulo).toEqual({ id: 123 });
      });

      it('should return new IArticulo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultArticulo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultArticulo).toEqual(new Articulo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Articulo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultArticulo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultArticulo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
