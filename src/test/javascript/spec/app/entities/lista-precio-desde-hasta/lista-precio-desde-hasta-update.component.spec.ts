import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { ListaPrecioDesdeHastaUpdateComponent } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta-update.component';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

describe('Component Tests', () => {
  describe('ListaPrecioDesdeHasta Management Update Component', () => {
    let comp: ListaPrecioDesdeHastaUpdateComponent;
    let fixture: ComponentFixture<ListaPrecioDesdeHastaUpdateComponent>;
    let service: ListaPrecioDesdeHastaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [ListaPrecioDesdeHastaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListaPrecioDesdeHastaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaPrecioDesdeHastaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaPrecioDesdeHastaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListaPrecioDesdeHasta(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ListaPrecioDesdeHasta();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
