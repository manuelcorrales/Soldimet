import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoTarjetaComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaService } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.service';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

describe('Component Tests', () => {
  describe('MedioDePagoTarjeta Management Component', () => {
    let comp: MedioDePagoTarjetaComponent;
    let fixture: ComponentFixture<MedioDePagoTarjetaComponent>;
    let service: MedioDePagoTarjetaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoTarjetaComponent],
        providers: []
      })
        .overrideTemplate(MedioDePagoTarjetaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoTarjetaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedioDePagoTarjetaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedioDePagoTarjeta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medioDePagoTarjetas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
