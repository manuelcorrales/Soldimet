jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';

import { ListaPrecioRectificacionCRAMRoutingResolveService } from './lista-precio-rectificacion-cram-routing-resolve.service';

describe('Service Tests', () => {
  describe('ListaPrecioRectificacionCRAM routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ListaPrecioRectificacionCRAMRoutingResolveService;
    let service: ListaPrecioRectificacionCRAMService;
    let resultListaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ListaPrecioRectificacionCRAMRoutingResolveService);
      service = TestBed.inject(ListaPrecioRectificacionCRAMService);
      resultListaPrecioRectificacionCRAM = undefined;
    });

    describe('resolve', () => {
      it('should return IListaPrecioRectificacionCRAM returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioRectificacionCRAM = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultListaPrecioRectificacionCRAM).toEqual({ id: 123 });
      });

      it('should return new IListaPrecioRectificacionCRAM if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioRectificacionCRAM = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultListaPrecioRectificacionCRAM).toEqual(new ListaPrecioRectificacionCRAM());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ListaPrecioRectificacionCRAM })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultListaPrecioRectificacionCRAM = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultListaPrecioRectificacionCRAM).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
