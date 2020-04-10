export class DtoNameSeries {
  constructor(public series: DtoSerie[], public name: string) {}
}

export class DtoSerie {
  constructor(public value: number, public name: string) {}
}
