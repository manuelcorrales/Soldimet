/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioRectificacionCRAMDeleteDialogComponent } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram-delete-dialog.component';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';

describe('Component Tests', () => {
    describe('ListaPrecioRectificacionCRAM Management Delete Component', () => {
        let comp: ListaPrecioRectificacionCRAMDeleteDialogComponent;
        let fixture: ComponentFixture<ListaPrecioRectificacionCRAMDeleteDialogComponent>;
        let service: ListaPrecioRectificacionCRAMService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioRectificacionCRAMDeleteDialogComponent]
            })
                .overrideTemplate(ListaPrecioRectificacionCRAMDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListaPrecioRectificacionCRAMDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioRectificacionCRAMService);
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
