import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { SubCategoriaDeleteDialogComponent } from 'app/entities/sub-categoria/sub-categoria-delete-dialog.component';
import { SubCategoriaService } from 'app/entities/sub-categoria/sub-categoria.service';

describe('Component Tests', () => {
  describe('SubCategoria Management Delete Component', () => {
    let comp: SubCategoriaDeleteDialogComponent;
    let fixture: ComponentFixture<SubCategoriaDeleteDialogComponent>;
    let service: SubCategoriaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [SubCategoriaDeleteDialogComponent]
      })
        .overrideTemplate(SubCategoriaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubCategoriaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubCategoriaService);
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
