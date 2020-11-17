export class FormView {
  schemeName?: string;
  createDate?: string;
  username?: string;

  constructor(schemeName: string, createDate: string, username: string) {
    this.schemeName = schemeName;
    this.createDate = createDate;
    this.username = username;
  }
}
