import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { StockArticuloUpdateComponent } from 'app/entities/stock-articulo/stock-articulo-update.component';
import { StockArticuloService } from 'app/entities/stock-articulo/stock-articulo.service';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';

describe('Component Tests', () => {
  describe('StockArticulo Management Update Component', () => {
    let comp: StockArticuloUpdateComponent;
    let fixture: ComponentFixture<StockArticuloUpdateComponent>;
    let service: StockArticuloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [StockArticuloUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StockArticuloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockArticuloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StockArticuloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StockArticulo(123);
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
        const entity = new StockArticulo();
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
