import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-card-puntero',
  templateUrl: './card-puntero.component.html',
  styleUrls: ['./card-puntero.component.scss']
})
export class CardPunteroComponent implements OnInit {
  @Input() metric = 'Cajas mensual por sucursal';

  legend = true;
  legendTitle = 'Sucursales';
  legendPosition = 'below';
  bigSegments = 4;
  view: any[] = [500, 300];

  @Input() data = [
    {
      name: 'A',
      value: 7300000
    }
  ];

  constructor() {}

  ngOnInit() {}
}
