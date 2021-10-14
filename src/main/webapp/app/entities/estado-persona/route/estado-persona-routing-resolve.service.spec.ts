jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoPersona, EstadoPersona } from '../estado-persona.model';
import { EstadoPersonaService } from '../service/estado-persona.service';

import { EstadoPersonaRoutingResolveService } from './estado-persona-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoPersona routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoPersonaRoutingResolveService;
    let service: EstadoPersonaService;
    let resultEstadoPersona: IEstadoPersona | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoPersonaRoutingResolveService);
      service = TestBed.inject(EstadoPersonaService);
      resultEstadoPersona = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoPersona returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPersona = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoPersona).toEqual({ id: 123 });
      });

      it('should return new IEstadoPersona if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPersona = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoPersona).toEqual(new EstadoPersona());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoPersona })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoPersona = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoPersona).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
