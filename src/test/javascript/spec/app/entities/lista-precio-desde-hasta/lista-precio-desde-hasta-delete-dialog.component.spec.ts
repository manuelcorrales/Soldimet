/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioDesdeHastaDeleteDialogComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-delete-dialog.component';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';

describe('Component Tests', () => {
    describe('ListaPrecioDesdeHasta Management Delete Component', () => {
        let comp: ListaPrecioDesdeHastaDeleteDialogComponent;
        let fixture: ComponentFixture<ListaPrecioDesdeHastaDeleteDialogComponent>;
        let service: ListaPrecioDesdeHastaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SoldimetTestModule],
                declarations: [ListaPrecioDesdeHastaDeleteDialogComponent]
            })
                .overrideTemplate(ListaPrecioDesdeHastaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ListaPrecioDesdeHastaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ListaPrecioDesdeHastaService);
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
