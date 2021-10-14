import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPersona } from '../estado-persona.model';

@Component({
  selector: 'jhi-estado-persona-detail',
  templateUrl: './estado-persona-detail.component.html',
})
export class EstadoPersonaDetailComponent implements OnInit {
  estadoPersona: IEstadoPersona | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPersona }) => {
      this.estadoPersona = estadoPersona;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
