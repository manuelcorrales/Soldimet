/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoChequeDeleteDialogComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-delete-dialog.component';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';

describe('Component Tests', () => {
    describe('MedioDePagoCheque Management Delete Component', () => {
        let comp: MedioDePagoChequeDeleteDialogComponent;
        let fixture: ComponentFixture<MedioDePagoChequeDeleteDialogComponent>;
        let service: MedioDePagoChequeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MedioDePagoChequeDeleteDialogComponent]
            })
                .overrideTemplate(MedioDePagoChequeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedioDePagoChequeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioDePagoChequeService);
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
