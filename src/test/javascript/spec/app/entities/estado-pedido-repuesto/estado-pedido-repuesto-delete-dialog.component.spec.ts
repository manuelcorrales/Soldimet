/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPedidoRepuestoDeleteDialogComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-delete-dialog.component';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';

describe('Component Tests', () => {
    describe('EstadoPedidoRepuesto Management Delete Component', () => {
        let comp: EstadoPedidoRepuestoDeleteDialogComponent;
        let fixture: ComponentFixture<EstadoPedidoRepuestoDeleteDialogComponent>;
        let service: EstadoPedidoRepuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoPedidoRepuestoDeleteDialogComponent]
            })
                .overrideTemplate(EstadoPedidoRepuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoPedidoRepuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoPedidoRepuestoService);
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
