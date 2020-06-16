import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoProveedorUpdateComponent } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor-update.component';
import { CostoRepuestoProveedorService } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor.service';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Update Component', () => {
    let comp: CostoRepuestoProveedorUpdateComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorUpdateComponent>;
    let service: CostoRepuestoProveedorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoProveedorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CostoRepuestoProveedorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoProveedorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CostoRepuestoProveedorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CostoRepuestoProveedor(123);
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
        const entity = new CostoRepuestoProveedor();
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
