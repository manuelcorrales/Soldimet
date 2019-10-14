import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoPresupuestoDetailComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-detail.component';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

describe('Component Tests', () => {
  describe('EstadoPresupuesto Management Detail Component', () => {
    let comp: EstadoPresupuestoDetailComponent;
    let fixture: ComponentFixture<EstadoPresupuestoDetailComponent>;
    const route = ({ data: of({ estadoPresupuesto: new EstadoPresupuesto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoPresupuestoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoPresupuestoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoPresupuestoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoPresupuesto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
