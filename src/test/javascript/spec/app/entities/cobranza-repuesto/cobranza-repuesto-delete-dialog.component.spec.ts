/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaRepuestoDeleteDialogComponent } from 'app/entities/cobranza-repuesto/cobranza-repuesto-delete-dialog.component';
import { CobranzaRepuestoService } from 'app/entities/cobranza-repuesto/cobranza-repuesto.service';

describe('Component Tests', () => {
    describe('CobranzaRepuesto Management Delete Component', () => {
        let comp: CobranzaRepuestoDeleteDialogComponent;
        let fixture: ComponentFixture<CobranzaRepuestoDeleteDialogComponent>;
        let service: CobranzaRepuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CobranzaRepuestoDeleteDialogComponent]
            })
                .overrideTemplate(CobranzaRepuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CobranzaRepuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CobranzaRepuestoService);
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
