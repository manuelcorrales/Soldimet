import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedioDePagoTarjetaDetailComponent } from './medio-de-pago-tarjeta-detail.component';

describe('Component Tests', () => {
  describe('MedioDePagoTarjeta Management Detail Component', () => {
    let comp: MedioDePagoTarjetaDetailComponent;
    let fixture: ComponentFixture<MedioDePagoTarjetaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MedioDePagoTarjetaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ medioDePagoTarjeta: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MedioDePagoTarjetaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoTarjetaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load medioDePagoTarjeta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medioDePagoTarjeta).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
