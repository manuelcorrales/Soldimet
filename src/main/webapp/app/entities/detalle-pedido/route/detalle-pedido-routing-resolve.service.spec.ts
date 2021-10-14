jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDetallePedido, DetallePedido } from '../detalle-pedido.model';
import { DetallePedidoService } from '../service/detalle-pedido.service';

import { DetallePedidoRoutingResolveService } from './detalle-pedido-routing-resolve.service';

describe('Service Tests', () => {
  describe('DetallePedido routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DetallePedidoRoutingResolveService;
    let service: DetallePedidoService;
    let resultDetallePedido: IDetallePedido | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DetallePedidoRoutingResolveService);
      service = TestBed.inject(DetallePedidoService);
      resultDetallePedido = undefined;
    });

    describe('resolve', () => {
      it('should return IDetallePedido returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePedido = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDetallePedido).toEqual({ id: 123 });
      });

      it('should return new IDetallePedido if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePedido = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDetallePedido).toEqual(new DetallePedido());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DetallePedido })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDetallePedido = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDetallePedido).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
