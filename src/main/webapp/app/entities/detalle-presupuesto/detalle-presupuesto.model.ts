import { BaseEntity } from './../../shared';

export class DetallePresupuesto implements BaseEntity {
    constructor(
        public id?: number,
        public importe?: number,
        public aplicacion?: BaseEntity,
        public cilindrada?: BaseEntity,
        public motor?: BaseEntity,
        public cobranzaOperacions?: BaseEntity[],
        public tipoParteMotor?: BaseEntity,
        public cobranzaRepuestos?: BaseEntity[],
    ) {
    }
}
