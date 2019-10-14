import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SoldimetTestModule } from '../../../test.module';
import { SucursalDeleteDialogComponent } from 'app/entities/sucursal/sucursal-delete-dialog.component';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

describe('Component Tests', () => {
  describe('Sucursal Management Delete Component', () => {
    let comp: SucursalDeleteDialogComponent;
    let fixture: ComponentFixture<SucursalDeleteDialogComponent>;
    let service: SucursalService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [SucursalDeleteDialogComponent]
      })
        .overrideTemplate(SucursalDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SucursalDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SucursalService);
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
