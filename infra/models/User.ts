interface IUser {
  id: string;
  name: string;
  githubId: string;
}

export class User implements IUser{
  public readonly id: string;
  public readonly name: string;
  public readonly githubId: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.githubId = data.githubId;
  }
}

