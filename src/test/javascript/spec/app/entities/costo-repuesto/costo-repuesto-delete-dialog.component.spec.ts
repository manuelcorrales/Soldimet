/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoDeleteDialogComponent } from 'app/entities/costo-repuesto/costo-repuesto-delete-dialog.component';
import { CostoRepuestoService } from 'app/entities/costo-repuesto/costo-repuesto.service';

describe('Component Tests', () => {
    describe('CostoRepuesto Management Delete Component', () => {
        let comp: CostoRepuestoDeleteDialogComponent;
        let fixture: ComponentFixture<CostoRepuestoDeleteDialogComponent>;
        let service: CostoRepuestoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CostoRepuestoDeleteDialogComponent]
            })
                .overrideTemplate(CostoRepuestoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CostoRepuestoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoRepuestoService);
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
