jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISubCategoria, SubCategoria } from '../sub-categoria.model';
import { SubCategoriaService } from '../service/sub-categoria.service';

import { SubCategoriaRoutingResolveService } from './sub-categoria-routing-resolve.service';

describe('Service Tests', () => {
  describe('SubCategoria routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SubCategoriaRoutingResolveService;
    let service: SubCategoriaService;
    let resultSubCategoria: ISubCategoria | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SubCategoriaRoutingResolveService);
      service = TestBed.inject(SubCategoriaService);
      resultSubCategoria = undefined;
    });

    describe('resolve', () => {
      it('should return ISubCategoria returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSubCategoria = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSubCategoria).toEqual({ id: 123 });
      });

      it('should return new ISubCategoria if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSubCategoria = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSubCategoria).toEqual(new SubCategoria());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SubCategoria })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSubCategoria = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSubCategoria).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
