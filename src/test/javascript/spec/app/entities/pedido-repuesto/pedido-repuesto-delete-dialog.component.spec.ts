/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { PedidoRepuestoDeleteDialogComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-delete-dialog.component';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';

describe('Component Tests', () => {
    describe('PedidoRepuesto Management Delete Component', () => {
        let comp: PedidoRepuestoDeleteDialogComponent;
        let fixture: ComponentFixture<PedidoRepuestoDeleteDialogComponent>;
        let service: PedidoRepuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PedidoRepuestoDeleteDialogComponent]
            })
                .overrideTemplate(PedidoRepuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PedidoRepuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PedidoRepuestoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
