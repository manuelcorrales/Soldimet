jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPedidoRepuesto, PedidoRepuesto } from '../pedido-repuesto.model';
import { PedidoRepuestoService } from '../service/pedido-repuesto.service';

import { PedidoRepuestoRoutingResolveService } from './pedido-repuesto-routing-resolve.service';

describe('Service Tests', () => {
  describe('PedidoRepuesto routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PedidoRepuestoRoutingResolveService;
    let service: PedidoRepuestoService;
    let resultPedidoRepuesto: IPedidoRepuesto | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PedidoRepuestoRoutingResolveService);
      service = TestBed.inject(PedidoRepuestoService);
      resultPedidoRepuesto = undefined;
    });

    describe('resolve', () => {
      it('should return IPedidoRepuesto returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPedidoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPedidoRepuesto).toEqual({ id: 123 });
      });

      it('should return new IPedidoRepuesto if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPedidoRepuesto = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPedidoRepuesto).toEqual(new PedidoRepuesto());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PedidoRepuesto })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPedidoRepuesto = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPedidoRepuesto).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
