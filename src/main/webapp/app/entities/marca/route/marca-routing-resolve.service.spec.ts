jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMarca, Marca } from '../marca.model';
import { MarcaService } from '../service/marca.service';

import { MarcaRoutingResolveService } from './marca-routing-resolve.service';

describe('Service Tests', () => {
  describe('Marca routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MarcaRoutingResolveService;
    let service: MarcaService;
    let resultMarca: IMarca | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MarcaRoutingResolveService);
      service = TestBed.inject(MarcaService);
      resultMarca = undefined;
    });

    describe('resolve', () => {
      it('should return IMarca returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMarca = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMarca).toEqual({ id: 123 });
      });

      it('should return new IMarca if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMarca = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMarca).toEqual(new Marca());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Marca })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMarca = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMarca).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
