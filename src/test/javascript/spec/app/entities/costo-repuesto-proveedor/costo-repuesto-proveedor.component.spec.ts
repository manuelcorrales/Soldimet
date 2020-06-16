import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoProveedorComponent } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor.component';
import { CostoRepuestoProveedorService } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor.service';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Component', () => {
    let comp: CostoRepuestoProveedorComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorComponent>;
    let service: CostoRepuestoProveedorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoProveedorComponent],
        providers: []
      })
        .overrideTemplate(CostoRepuestoProveedorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoProveedorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CostoRepuestoProveedorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CostoRepuestoProveedor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.costoRepuestoProveedors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
