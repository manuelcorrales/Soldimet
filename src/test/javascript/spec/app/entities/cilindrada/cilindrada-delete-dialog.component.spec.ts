import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CilindradaDeleteDialogComponent } from 'app/entities/cilindrada/cilindrada-delete-dialog.component';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';

describe('Component Tests', () => {
  describe('Cilindrada Management Delete Component', () => {
    let comp: CilindradaDeleteDialogComponent;
    let fixture: ComponentFixture<CilindradaDeleteDialogComponent>;
    let service: CilindradaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CilindradaDeleteDialogComponent]
      })
        .overrideTemplate(CilindradaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CilindradaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CilindradaService);
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
