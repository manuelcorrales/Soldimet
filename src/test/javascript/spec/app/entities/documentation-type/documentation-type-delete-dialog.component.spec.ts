import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { DocumentationTypeDeleteDialogComponent } from 'app/entities/documentation-type/documentation-type-delete-dialog.component';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';

describe('Component Tests', () => {
  describe('DocumentationType Management Delete Component', () => {
    let comp: DocumentationTypeDeleteDialogComponent;
    let fixture: ComponentFixture<DocumentationTypeDeleteDialogComponent>;
    let service: DocumentationTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DocumentationTypeDeleteDialogComponent]
      })
        .overrideTemplate(DocumentationTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentationTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentationTypeService);
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
