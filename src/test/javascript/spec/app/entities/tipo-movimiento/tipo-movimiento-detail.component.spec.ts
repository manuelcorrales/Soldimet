import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { TipoMovimientoDetailComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-detail.component';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

describe('Component Tests', () => {
  describe('TipoMovimiento Management Detail Component', () => {
    let comp: TipoMovimientoDetailComponent;
    let fixture: ComponentFixture<TipoMovimientoDetailComponent>;
    const route = ({ data: of({ tipoMovimiento: new TipoMovimiento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [TipoMovimientoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoMovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoMovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoMovimiento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
