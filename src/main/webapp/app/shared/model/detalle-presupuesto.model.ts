import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { IMotor } from 'app/shared/model/motor.model';
import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

export interface IDetallePresupuesto {
    id?: number;
    importe?: number;
    aplicacion?: IAplicacion;
    cilindrada?: ICilindrada;
    motor?: IMotor;
    cobranzaOperacions?: ICobranzaOperacion[];
    tipoParteMotor?: ITipoParteMotor;
    cobranzaRepuestos?: ICobranzaRepuesto[];
}

export class DetallePresupuesto implements IDetallePresupuesto {
    constructor(
        public id?: number,
        public importe?: number,
        public aplicacion?: IAplicacion,
        public cilindrada?: ICilindrada,
        public motor?: IMotor,
        public cobranzaOperacions?: ICobranzaOperacion[],
        public tipoParteMotor?: ITipoParteMotor,
        public cobranzaRepuestos?: ICobranzaRepuesto[]
    ) {}
}
