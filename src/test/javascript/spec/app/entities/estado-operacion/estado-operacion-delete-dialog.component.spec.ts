/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoOperacionDeleteDialogComponent } from 'app/entities/estado-operacion/estado-operacion-delete-dialog.component';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

describe('Component Tests', () => {
    describe('EstadoOperacion Management Delete Component', () => {
        let comp: EstadoOperacionDeleteDialogComponent;
        let fixture: ComponentFixture<EstadoOperacionDeleteDialogComponent>;
        let service: EstadoOperacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoOperacionDeleteDialogComponent]
            })
                .overrideTemplate(EstadoOperacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoOperacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoOperacionService);
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
