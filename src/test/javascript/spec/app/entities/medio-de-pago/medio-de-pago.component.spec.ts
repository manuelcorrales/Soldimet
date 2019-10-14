import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { MedioDePagoComponent } from 'app/entities/medio-de-pago/medio-de-pago.component';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';

describe('Component Tests', () => {
  describe('MedioDePago Management Component', () => {
    let comp: MedioDePagoComponent;
    let fixture: ComponentFixture<MedioDePagoComponent>;
    let service: MedioDePagoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [MedioDePagoComponent],
        providers: []
      })
        .overrideTemplate(MedioDePagoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedioDePagoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedioDePagoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedioDePago(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medioDePagos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
