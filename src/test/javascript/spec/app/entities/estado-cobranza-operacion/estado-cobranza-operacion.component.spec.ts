import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoCobranzaOperacionComponent } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';
import { EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

describe('Component Tests', () => {
  describe('EstadoCobranzaOperacion Management Component', () => {
    let comp: EstadoCobranzaOperacionComponent;
    let fixture: ComponentFixture<EstadoCobranzaOperacionComponent>;
    let service: EstadoCobranzaOperacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoCobranzaOperacionComponent],
        providers: []
      })
        .overrideTemplate(EstadoCobranzaOperacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstadoCobranzaOperacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstadoCobranzaOperacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstadoCobranzaOperacion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estadoCobranzaOperacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
