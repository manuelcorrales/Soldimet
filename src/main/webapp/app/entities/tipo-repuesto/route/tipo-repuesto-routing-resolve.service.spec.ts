jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITipoRepuesto, TipoRepuesto } from '../tipo-repuesto.model';
import { TipoRepuestoService } from '../service/tipo-repuesto.service';

import { TipoRepuestoRoutingResolveService } from './tipo-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('TipoRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TipoRepuestoRoutingResolveService;
    let service: TipoRepuestoService;
    let resultTipoRepuesto: ITipoRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TipoRepuestoRoutingResolveService);
      service = TestBed.inject(TipoRepuestoService);
      resultTipoRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return ITipoRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoRepuesto).toEqual({ id: 123 });
      });

      it('should return new ITipoRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTipoRepuesto).toEqual(new TipoRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TipoRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTipoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTipoRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
