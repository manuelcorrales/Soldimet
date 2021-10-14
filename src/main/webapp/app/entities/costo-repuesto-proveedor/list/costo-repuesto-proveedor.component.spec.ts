import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';

import { CostoRepuestoProveedorComponent } from './costo-repuesto-proveedor.component';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Component', () => {
    let comp: CostoRepuestoProveedorComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorComponent>;
    let service: CostoRepuestoProveedorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CostoRepuestoProveedorComponent],
      })
        .overrideTemplate(CostoRepuestoProveedorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CostoRepuestoProveedorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CostoRepuestoProveedorService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.costoRepuestoProveedors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
