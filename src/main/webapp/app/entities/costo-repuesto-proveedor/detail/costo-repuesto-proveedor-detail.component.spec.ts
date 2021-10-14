import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CostoRepuestoProveedorDetailComponent } from './costo-repuesto-proveedor-detail.component';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Detail Component', () => {
    let comp: CostoRepuestoProveedorDetailComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CostoRepuestoProveedorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ costoRepuestoProveedor: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CostoRepuestoProveedorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoRepuestoProveedorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load costoRepuestoProveedor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoRepuestoProveedor).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
