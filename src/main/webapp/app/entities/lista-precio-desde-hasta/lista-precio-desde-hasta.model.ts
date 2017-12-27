import { BaseEntity } from './../../shared';

export class ListaPrecioDesdeHasta implements BaseEntity {
    constructor(
        public id?: number,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public listaPrecioRectificacionCRAMS?: BaseEntity[],
    ) {
    }
}
