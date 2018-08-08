/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePresupuestoDeleteDialogComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-delete-dialog.component';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';

describe('Component Tests', () => {
    describe('DetallePresupuesto Management Delete Component', () => {
        let comp: DetallePresupuestoDeleteDialogComponent;
        let fixture: ComponentFixture<DetallePresupuestoDeleteDialogComponent>;
        let service: DetallePresupuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [DetallePresupuestoDeleteDialogComponent]
            })
                .overrideTemplate(DetallePresupuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DetallePresupuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DetallePresupuestoService);
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
