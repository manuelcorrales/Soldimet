import { Component, OnInit } from '@angular/core';
import { Articulo } from 'app/shared/model/articulo.model';
import { Marca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca';

interface ArticulosPorMarca {
  marca: Marca;
  articulos: Articulo[];
}

@Component({
  selector: 'jhi-repuestos',
  templateUrl: './repuestos.component.html',
  styles: []
})
export class RepuestosComponent implements OnInit {
  marcas: Marca[] = [];
  tabStatus = [];

  constructor(private marcaService: MarcaService) {}

  ngOnInit() {
    this.marcaService.query().subscribe(marcas => {
      this.marcas = marcas.body;
      this.marcas.forEach((marca: Marca, i) => (this.tabStatus[i] = false));
      this.tabStatus[0] = true;
    });
  }
}
