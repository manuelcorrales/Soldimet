/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoMovimientoDeleteDialogComponent } from 'app/entities/estado-movimiento/estado-movimiento-delete-dialog.component';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';

describe('Component Tests', () => {
    describe('EstadoMovimiento Management Delete Component', () => {
        let comp: EstadoMovimientoDeleteDialogComponent;
        let fixture: ComponentFixture<EstadoMovimientoDeleteDialogComponent>;
        let service: EstadoMovimientoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoMovimientoDeleteDialogComponent]
            })
                .overrideTemplate(EstadoMovimientoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoMovimientoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoMovimientoService);
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
