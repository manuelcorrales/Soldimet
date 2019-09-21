import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoEfectivoDetailComponent } from 'app/entities/pago-efectivo/pago-efectivo-detail.component';
import { PagoEfectivo } from 'app/shared/model/pago-efectivo.model';

describe('Component Tests', () => {
  describe('PagoEfectivo Management Detail Component', () => {
    let comp: PagoEfectivoDetailComponent;
    let fixture: ComponentFixture<PagoEfectivoDetailComponent>;
    const route = ({ data: of({ pagoEfectivo: new PagoEfectivo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoEfectivoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagoEfectivoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoEfectivoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoEfectivo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
