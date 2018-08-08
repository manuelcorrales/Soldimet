/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { FormaDePagoDeleteDialogComponent } from 'app/entities/forma-de-pago/forma-de-pago-delete-dialog.component';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

describe('Component Tests', () => {
    describe('FormaDePago Management Delete Component', () => {
        let comp: FormaDePagoDeleteDialogComponent;
        let fixture: ComponentFixture<FormaDePagoDeleteDialogComponent>;
        let service: FormaDePagoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [FormaDePagoDeleteDialogComponent]
            })
                .overrideTemplate(FormaDePagoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FormaDePagoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormaDePagoService);
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
