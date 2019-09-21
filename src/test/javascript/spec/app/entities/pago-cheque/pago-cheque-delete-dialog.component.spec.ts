import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { PagoChequeDeleteDialogComponent } from 'app/entities/pago-cheque/pago-cheque-delete-dialog.component';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';

describe('Component Tests', () => {
  describe('PagoCheque Management Delete Component', () => {
    let comp: PagoChequeDeleteDialogComponent;
    let fixture: ComponentFixture<PagoChequeDeleteDialogComponent>;
    let service: PagoChequeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoChequeDeleteDialogComponent]
      })
        .overrideTemplate(PagoChequeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoChequeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoChequeService);
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
