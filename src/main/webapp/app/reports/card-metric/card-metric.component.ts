import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-card-metric',
  templateUrl: './card-metric.component.html',
  styleUrls: ['./card-metric.component.scss']
})
export class CardMetricComponent implements OnInit {
  @Input() categoria: string;
  @Input() valor: string;
  @Input() icon: string;
  @Input() link: string;
  @Input() bgColor: string;
  @Input() textColor: string;

  constructor() {}

  ngOnInit() {}
}
