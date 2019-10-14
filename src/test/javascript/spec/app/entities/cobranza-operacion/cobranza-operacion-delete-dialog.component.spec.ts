import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CobranzaOperacionDeleteDialogComponent } from 'app/entities/cobranza-operacion/cobranza-operacion-delete-dialog.component';
import { CobranzaOperacionService } from 'app/entities/cobranza-operacion/cobranza-operacion.service';

describe('Component Tests', () => {
  describe('CobranzaOperacion Management Delete Component', () => {
    let comp: CobranzaOperacionDeleteDialogComponent;
    let fixture: ComponentFixture<CobranzaOperacionDeleteDialogComponent>;
    let service: CobranzaOperacionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CobranzaOperacionDeleteDialogComponent]
      })
        .overrideTemplate(CobranzaOperacionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CobranzaOperacionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CobranzaOperacionService);
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
