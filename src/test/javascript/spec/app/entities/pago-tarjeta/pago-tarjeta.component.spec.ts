import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { PagoTarjetaComponent } from 'app/entities/pago-tarjeta/pago-tarjeta.component';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';
import { PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

describe('Component Tests', () => {
  describe('PagoTarjeta Management Component', () => {
    let comp: PagoTarjetaComponent;
    let fixture: ComponentFixture<PagoTarjetaComponent>;
    let service: PagoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [PagoTarjetaComponent],
        providers: []
      })
        .overrideTemplate(PagoTarjetaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoTarjetaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoTarjetaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagoTarjeta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagoTarjetas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
