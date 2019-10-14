import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoTarjetaDetailComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

describe('Component Tests', () => {
  describe('MedioDePagoTarjeta Management Detail Component', () => {
    let comp: MedioDePagoTarjetaDetailComponent;
    let fixture: ComponentFixture<MedioDePagoTarjetaDetailComponent>;
    const route = ({ data: of({ medioDePagoTarjeta: new MedioDePagoTarjeta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoTarjetaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MedioDePagoTarjetaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MedioDePagoTarjetaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.medioDePagoTarjeta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
