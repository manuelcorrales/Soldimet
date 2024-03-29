export interface IDocumentationType {
  id?: number;
  documentName?: string;
}

export class DocumentationType implements IDocumentationType {
  constructor(public id?: number, public documentName?: string) {}
}
