/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePedidoDeleteDialogComponent } from 'app/entities/detalle-pedido/detalle-pedido-delete-dialog.component';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';

describe('Component Tests', () => {
    describe('DetallePedido Management Delete Component', () => {
        let comp: DetallePedidoDeleteDialogComponent;
        let fixture: ComponentFixture<DetallePedidoDeleteDialogComponent>;
        let service: DetallePedidoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePedidoDeleteDialogComponent]
            })
                .overrideTemplate(DetallePedidoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DetallePedidoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePedidoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
