export interface IAplicacion {
  id?: number;
  nombreAplicacion?: string;
  numeroGrupo?: number;
}

export class Aplicacion implements IAplicacion {
  constructor(public id?: number, public nombreAplicacion?: string, public numeroGrupo?: number) {}
}
