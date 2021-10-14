import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TipoParteMotorService } from '../service/tipo-parte-motor.service';

import { TipoParteMotorComponent } from './tipo-parte-motor.component';

describe('Component Tests', () => {
  describe('TipoParteMotor Management Component', () => {
    let comp: TipoParteMotorComponent;
    let fixture: ComponentFixture<TipoParteMotorComponent>;
    let service: TipoParteMotorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TipoParteMotorComponent],
      })
        .overrideTemplate(TipoParteMotorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoParteMotorComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TipoParteMotorService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoParteMotors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
