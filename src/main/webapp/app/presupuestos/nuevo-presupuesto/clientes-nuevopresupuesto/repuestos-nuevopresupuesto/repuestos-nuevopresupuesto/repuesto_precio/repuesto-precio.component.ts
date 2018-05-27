import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../../../../../entities/articulo';

@Component({
  selector: 'jhi-repuesto-precio',
  templateUrl: './repuesto-precio.component.html',
  styles: []
})
export class RepuestoPrecioComponent implements OnInit {
    @Input()
    repuesto: Articulo;
    seleccionado = false;
    precio = 0;

  constructor( ) {
   }

  ngOnInit() {
  }

}
