export interface IEstadoMovimiento {
    id?: number;
    nombreEstado?: string;
}

export class EstadoMovimiento implements IEstadoMovimiento {
    constructor(public id?: number, public nombreEstado?: string) {}
}
