import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoParteMotorDetailComponent } from './tipo-parte-motor-detail.component';

describe('Component Tests', () => {
  describe('TipoParteMotor Management Detail Component', () => {
    let comp: TipoParteMotorDetailComponent;
    let fixture: ComponentFixture<TipoParteMotorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TipoParteMotorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tipoParteMotor: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TipoParteMotorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoParteMotorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoParteMotor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoParteMotor).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
