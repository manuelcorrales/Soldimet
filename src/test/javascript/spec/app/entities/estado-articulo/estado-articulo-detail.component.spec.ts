import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SoldimetTestModule } from '../../../test.module';
import { EstadoArticuloDetailComponent } from 'app/entities/estado-articulo/estado-articulo-detail.component';
import { EstadoArticulo } from 'app/shared/model/estado-articulo.model';

describe('Component Tests', () => {
  describe('EstadoArticulo Management Detail Component', () => {
    let comp: EstadoArticuloDetailComponent;
    let fixture: ComponentFixture<EstadoArticuloDetailComponent>;
    const route = ({ data: of({ estadoArticulo: new EstadoArticulo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SoldimetTestModule],
        declarations: [EstadoArticuloDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstadoArticuloDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstadoArticuloDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estadoArticulo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
