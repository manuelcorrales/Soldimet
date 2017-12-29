import { BaseEntity } from './../../shared';

export class ListaPrecioRectificacionCRAM implements BaseEntity {
    constructor(
        public id?: number,
        public fechaVigenciaDesde?: any,
        public fechaVigenciaHasta?: any,
        public numeroGrupo?: number,
        public costoOperacion?: BaseEntity,
        public fechas?: BaseEntity[],
    ) {
    }
}
