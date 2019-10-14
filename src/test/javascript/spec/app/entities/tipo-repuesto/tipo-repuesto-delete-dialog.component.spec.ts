import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { TipoRepuestoDeleteDialogComponent } from 'app/entities/tipo-repuesto/tipo-repuesto-delete-dialog.component';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';

describe('Component Tests', () => {
  describe('TipoRepuesto Management Delete Component', () => {
    let comp: TipoRepuestoDeleteDialogComponent;
    let fixture: ComponentFixture<TipoRepuestoDeleteDialogComponent>;
    let service: TipoRepuestoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoRepuestoDeleteDialogComponent]
      })
        .overrideTemplate(TipoRepuestoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoRepuestoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoRepuestoService);
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
