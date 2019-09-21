import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetallePresupuestoDetailComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-detail.component';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

describe('Component Tests', () => {
  describe('DetallePresupuesto Management Detail Component', () => {
    let comp: DetallePresupuestoDetailComponent;
    let fixture: ComponentFixture<DetallePresupuestoDetailComponent>;
    const route = ({ data: of({ detallePresupuesto: new DetallePresupuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetallePresupuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetallePresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetallePresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detallePresupuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
