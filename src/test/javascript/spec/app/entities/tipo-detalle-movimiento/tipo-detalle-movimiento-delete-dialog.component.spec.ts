/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { TipoDetalleMovimientoDeleteDialogComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-delete-dialog.component';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';

describe('Component Tests', () => {
    describe('TipoDetalleMovimiento Management Delete Component', () => {
        let comp: TipoDetalleMovimientoDeleteDialogComponent;
        let fixture: ComponentFixture<TipoDetalleMovimientoDeleteDialogComponent>;
        let service: TipoDetalleMovimientoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoDetalleMovimientoDeleteDialogComponent]
            })
                .overrideTemplate(TipoDetalleMovimientoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoDetalleMovimientoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDetalleMovimientoService);
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
