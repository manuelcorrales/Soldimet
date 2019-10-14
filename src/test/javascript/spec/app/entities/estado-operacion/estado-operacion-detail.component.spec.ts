import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoOperacionDetailComponent } from 'app/entities/estado-operacion/estado-operacion-detail.component';
import { EstadoOperacion } from 'app/shared/model/estado-operacion.model';

describe('Component Tests', () => {
  describe('EstadoOperacion Management Detail Component', () => {
    let comp: EstadoOperacionDetailComponent;
    let fixture: ComponentFixture<EstadoOperacionDetailComponent>;
    const route = ({ data: of({ estadoOperacion: new EstadoOperacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoOperacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoOperacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoOperacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoOperacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
