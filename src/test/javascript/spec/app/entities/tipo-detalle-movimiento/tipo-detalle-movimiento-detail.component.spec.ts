import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoDetalleMovimientoDetailComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

describe('Component Tests', () => {
  describe('TipoDetalleMovimiento Management Detail Component', () => {
    let comp: TipoDetalleMovimientoDetailComponent;
    let fixture: ComponentFixture<TipoDetalleMovimientoDetailComponent>;
    const route = ({ data: of({ tipoDetalleMovimiento: new TipoDetalleMovimiento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoDetalleMovimientoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoDetalleMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoDetalleMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoDetalleMovimiento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
