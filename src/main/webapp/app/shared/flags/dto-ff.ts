export class DtoFF {
  constructor(
    public customProperties: object,
    public description: string,
    public enable: boolean,
    public flippingStrategy: { initParams: object; type: string },
    public group: string,
    public permissions: [string],
    public uid: string
  ) {}
}
