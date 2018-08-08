/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MovimientoArticuloDeleteDialogComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-delete-dialog.component';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';

describe('Component Tests', () => {
    describe('MovimientoArticulo Management Delete Component', () => {
        let comp: MovimientoArticuloDeleteDialogComponent;
        let fixture: ComponentFixture<MovimientoArticuloDeleteDialogComponent>;
        let service: MovimientoArticuloService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MovimientoArticuloDeleteDialogComponent]
            })
                .overrideTemplate(MovimientoArticuloDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovimientoArticuloDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovimientoArticuloService);
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
