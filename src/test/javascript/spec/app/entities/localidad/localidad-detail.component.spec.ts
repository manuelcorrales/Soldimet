import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { LocalidadDetailComponent } from 'app/entities/localidad/localidad-detail.component';
import { Localidad } from 'app/shared/model/localidad.model';

describe('Component Tests', () => {
  describe('Localidad Management Detail Component', () => {
    let comp: LocalidadDetailComponent;
    let fixture: ComponentFixture<LocalidadDetailComponent>;
    const route = ({ data: of({ localidad: new Localidad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [LocalidadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LocalidadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalidadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localidad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
