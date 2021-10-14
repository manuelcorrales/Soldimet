import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MarcaService } from '../service/marca.service';

import { MarcaComponent } from './marca.component';

describe('Component Tests', () => {
  describe('Marca Management Component', () => {
    let comp: MarcaComponent;
    let fixture: ComponentFixture<MarcaComponent>;
    let service: MarcaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MarcaComponent],
      })
        .overrideTemplate(MarcaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MarcaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MarcaService);

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
      expect(comp.marcas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
