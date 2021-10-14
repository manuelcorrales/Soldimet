jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

import { ListaPrecioDesdeHastaRoutingResolveService } from './lista-precio-desde-hasta-routing-resolve.service';

describe('Service Tests', () => {
  describe('ListaPrecioDesdeHasta routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ListaPrecioDesdeHastaRoutingResolveService;
    let service: ListaPrecioDesdeHastaService;
    let resultListaPrecioDesdeHasta: IListaPrecioDesdeHasta | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ListaPrecioDesdeHastaRoutingResolveService);
      service = TestBed.inject(ListaPrecioDesdeHastaService);
      resultListaPrecioDesdeHasta = undefined;
    });

    describe('resolve', () => {
      it('should return IListaPrecioDesdeHasta returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioDesdeHasta = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultListaPrecioDesdeHasta).toEqual({ id: 123 });
      });

      it('should return new IListaPrecioDesdeHasta if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioDesdeHasta = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultListaPrecioDesdeHasta).toEqual(new ListaPrecioDesdeHasta());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ListaPrecioDesdeHasta })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioDesdeHasta = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultListaPrecioDesdeHasta).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
