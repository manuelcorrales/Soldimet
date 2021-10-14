import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICilindrada } from '../cilindrada.model';

@Component({
  selector: 'jhi-cilindrada-detail',
  templateUrl: './cilindrada-detail.component.html',
})
export class CilindradaDetailComponent implements OnInit {
  cilindrada: ICilindrada | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cilindrada }) => {
      this.cilindrada = cilindrada;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
