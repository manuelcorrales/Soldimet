/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { TipoParteMotorDeleteDialogComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-delete-dialog.component';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

describe('Component Tests', () => {
    describe('TipoParteMotor Management Delete Component', () => {
        let comp: TipoParteMotorDeleteDialogComponent;
        let fixture: ComponentFixture<TipoParteMotorDeleteDialogComponent>;
        let service: TipoParteMotorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [TipoParteMotorDeleteDialogComponent]
            })
                .overrideTemplate(TipoParteMotorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoParteMotorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteMotorService);
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
