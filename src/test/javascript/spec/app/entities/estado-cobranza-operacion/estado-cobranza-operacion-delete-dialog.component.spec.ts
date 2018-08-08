/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCobranzaOperacionDeleteDialogComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion-delete-dialog.component';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';

describe('Component Tests', () => {
    describe('EstadoCobranzaOperacion Management Delete Component', () => {
        let comp: EstadoCobranzaOperacionDeleteDialogComponent;
        let fixture: ComponentFixture<EstadoCobranzaOperacionDeleteDialogComponent>;
        let service: EstadoCobranzaOperacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [EstadoCobranzaOperacionDeleteDialogComponent]
            })
                .overrideTemplate(EstadoCobranzaOperacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EstadoCobranzaOperacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoCobranzaOperacionService);
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
