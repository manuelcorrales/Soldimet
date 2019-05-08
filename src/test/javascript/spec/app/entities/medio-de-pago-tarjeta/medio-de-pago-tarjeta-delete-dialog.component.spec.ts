/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoTarjetaDeleteDialogComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-delete-dialog.component';
import { MedioDePagoTarjetaService } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.service';

describe('Component Tests', () => {
    describe('MedioDePagoTarjeta Management Delete Component', () => {
        let comp: MedioDePagoTarjetaDeleteDialogComponent;
        let fixture: ComponentFixture<MedioDePagoTarjetaDeleteDialogComponent>;
        let service: MedioDePagoTarjetaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [MedioDePagoTarjetaDeleteDialogComponent]
            })
                .overrideTemplate(MedioDePagoTarjetaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedioDePagoTarjetaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedioDePagoTarjetaService);
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
