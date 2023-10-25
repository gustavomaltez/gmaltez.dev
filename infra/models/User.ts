type MandatoryFields = {
  id: string;
  name: string;
  githubId: string;
}

export class User {
  public id: string | null = null;
  public name: string | null = null;
  public githubId: string | null = null;

  constructor(data: MandatoryFields) {
    this.id = data.id;
    this.name = data.name;
    this.githubId = data.githubId;
  }
}

