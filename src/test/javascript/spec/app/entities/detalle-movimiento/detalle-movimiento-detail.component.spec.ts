import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { DetalleMovimientoDetailComponent } from 'app/entities/detalle-movimiento/detalle-movimiento-detail.component';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

describe('Component Tests', () => {
  describe('DetalleMovimiento Management Detail Component', () => {
    let comp: DetalleMovimientoDetailComponent;
    let fixture: ComponentFixture<DetalleMovimientoDetailComponent>;
    const route = ({ data: of({ detalleMovimiento: new DetalleMovimiento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [DetalleMovimientoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleMovimiento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
