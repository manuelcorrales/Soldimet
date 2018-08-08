import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { IOperacion } from 'app/shared/model/operacion.model';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

export interface ICostoOperacion {
    id?: number;
    costoOperacion?: number;
    cilindrada?: ICilindrada;
    operacion?: IOperacion;
    tipoParteMotor?: ITipoParteMotor;
}

export class CostoOperacion implements ICostoOperacion {
    constructor(
        public id?: number,
        public costoOperacion?: number,
        public cilindrada?: ICilindrada,
        public operacion?: IOperacion,
        public tipoParteMotor?: ITipoParteMotor
    ) {}
}
