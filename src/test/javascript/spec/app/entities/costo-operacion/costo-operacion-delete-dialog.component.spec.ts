import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { CostoOperacionDeleteDialogComponent } from 'app/entities/costo-operacion/costo-operacion-delete-dialog.component';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';

describe('Component Tests', () => {
  describe('CostoOperacion Management Delete Component', () => {
    let comp: CostoOperacionDeleteDialogComponent;
    let fixture: ComponentFixture<CostoOperacionDeleteDialogComponent>;
    let service: CostoOperacionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoOperacionDeleteDialogComponent]
      })
        .overrideTemplate(CostoOperacionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoOperacionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CostoOperacionService);
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
