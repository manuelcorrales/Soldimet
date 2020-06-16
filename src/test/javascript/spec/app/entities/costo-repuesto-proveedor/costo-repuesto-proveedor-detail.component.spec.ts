import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { CostoRepuestoProveedorDetailComponent } from 'app/entities/costo-repuesto-proveedor/costo-repuesto-proveedor-detail.component';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

describe('Component Tests', () => {
  describe('CostoRepuestoProveedor Management Detail Component', () => {
    let comp: CostoRepuestoProveedorDetailComponent;
    let fixture: ComponentFixture<CostoRepuestoProveedorDetailComponent>;
    const route = ({ data: of({ costoRepuestoProveedor: new CostoRepuestoProveedor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [CostoRepuestoProveedorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CostoRepuestoProveedorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CostoRepuestoProveedorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.costoRepuestoProveedor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
