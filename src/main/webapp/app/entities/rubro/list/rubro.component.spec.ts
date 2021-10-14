import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RubroService } from '../service/rubro.service';

import { RubroComponent } from './rubro.component';

describe('Component Tests', () => {
  describe('Rubro Management Component', () => {
    let comp: RubroComponent;
    let fixture: ComponentFixture<RubroComponent>;
    let service: RubroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RubroComponent],
      })
        .overrideTemplate(RubroComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RubroComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RubroService);

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
      expect(comp.rubros?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
