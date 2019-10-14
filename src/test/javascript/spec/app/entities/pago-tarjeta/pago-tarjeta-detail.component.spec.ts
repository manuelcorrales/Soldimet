import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { PagoTarjetaDetailComponent } from 'app/entities/pago-tarjeta/pago-tarjeta-detail.component';
import { PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Detail Component', () => {
    let comp: PagoTarjetaDetailComponent;
    let fixture: ComponentFixture<PagoTarjetaDetailComponent>;
    const route = ({ data: of({ pagoTarjeta: new PagoTarjeta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoTarjetaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagoTarjetaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoTarjetaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoTarjeta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
