export interface IEstadoPersona {
    id?: number;
    nombreEstado?: string;
}

export class EstadoPersona implements IEstadoPersona {
    constructor(public id?: number, public nombreEstado?: string) {}
}
