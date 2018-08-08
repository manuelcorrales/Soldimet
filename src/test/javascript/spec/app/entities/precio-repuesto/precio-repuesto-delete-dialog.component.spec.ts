/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { PrecioRepuestoDeleteDialogComponent } from 'app/entities/precio-repuesto/precio-repuesto-delete-dialog.component';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';

describe('Component Tests', () => {
    describe('PrecioRepuesto Management Delete Component', () => {
        let comp: PrecioRepuestoDeleteDialogComponent;
        let fixture: ComponentFixture<PrecioRepuestoDeleteDialogComponent>;
        let service: PrecioRepuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [PrecioRepuestoDeleteDialogComponent]
            })
                .overrideTemplate(PrecioRepuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrecioRepuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioRepuestoService);
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
