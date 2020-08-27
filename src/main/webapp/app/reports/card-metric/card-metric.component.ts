import { Component, OnInit, Input } from '@angular/core';
import { CardMetric } from './card-metric';

@Component({
  selector: 'jhi-card-metric',
  templateUrl: './card-metric.component.html',
  styleUrls: ['./card-metric.component.scss']
})
export class CardMetricComponent implements OnInit {
  @Input() metric: CardMetric;

  constructor() {}

  ngOnInit() {}
}
