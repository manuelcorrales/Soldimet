export interface IMedioDePagoTarjeta {
  id?: number;
  ultimos4?: string;
}

export class MedioDePagoTarjeta implements IMedioDePagoTarjeta {
  constructor(public id?: number, public ultimos4?: string) {}
}

export function getMedioDePagoTarjetaIdentifier(medioDePagoTarjeta: IMedioDePagoTarjeta): number | undefined {
  return medioDePagoTarjeta.id;
}
