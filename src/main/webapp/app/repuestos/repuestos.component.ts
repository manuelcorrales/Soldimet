import { Component, OnInit } from '@angular/core';
import { RepuestosService } from 'app/repuestos/repuestos-services';
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
  articulosPorMarca: ArticulosPorMarca[] = [];

  constructor(private repuestosService: RepuestosService, private marcaService: MarcaService) {}

  ngOnInit() {
    this.marcaService.query().subscribe(marcas => {
      this.marcas = marcas.body;
      this.repuestosService.getArticulos().subscribe(articulos => {
        this.marcas.forEach(marca => {
          const articuloMarca = {
            marca,
            articulos: articulos.filter(articulo => articulo.marca.id === marca.id)
          };
          this.articulosPorMarca.push(articuloMarca);
        });
      });
    });
  }
}
