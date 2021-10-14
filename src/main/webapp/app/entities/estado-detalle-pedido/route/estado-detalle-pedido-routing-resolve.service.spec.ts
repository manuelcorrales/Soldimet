jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEstadoDetallePedido, EstadoDetallePedido } from '../estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';

import { EstadoDetallePedidoRoutingResolveService } from './estado-detalle-pedido-routing-resolve.service';

describe('Service Tests', () => {
  describe('EstadoDetallePedido routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EstadoDetallePedidoRoutingResolveService;
    let service: EstadoDetallePedidoService;
    let resultEstadoDetallePedido: IEstadoDetallePedido | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EstadoDetallePedidoRoutingResolveService);
      service = TestBed.inject(EstadoDetallePedidoService);
      resultEstadoDetallePedido = undefined;
    });

    describe('resolve', () => {
      it('should return IEstadoDetallePedido returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoDetallePedido = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoDetallePedido).toEqual({ id: 123 });
      });

      it('should return new IEstadoDetallePedido if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoDetallePedido = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEstadoDetallePedido).toEqual(new EstadoDetallePedido());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as EstadoDetallePedido })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEstadoDetallePedido = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEstadoDetallePedido).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
