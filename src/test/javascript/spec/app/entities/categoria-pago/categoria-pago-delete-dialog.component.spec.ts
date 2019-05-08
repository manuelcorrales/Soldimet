/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CategoriaPagoDeleteDialogComponent } from 'app/entities/categoria-pago/categoria-pago-delete-dialog.component';
import { CategoriaPagoService } from 'app/entities/categoria-pago/categoria-pago.service';

describe('Component Tests', () => {
    describe('CategoriaPago Management Delete Component', () => {
        let comp: CategoriaPagoDeleteDialogComponent;
        let fixture: ComponentFixture<CategoriaPagoDeleteDialogComponent>;
        let service: CategoriaPagoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [CategoriaPagoDeleteDialogComponent]
            })
                .overrideTemplate(CategoriaPagoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriaPagoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaPagoService);
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
