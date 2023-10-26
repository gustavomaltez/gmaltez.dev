interface IUser {
  id: string;
  name: string;
  githubId: string;
}

export class User implements IUser {
  public readonly id: string;
  public readonly name: string;
  public readonly githubId: string;
  public readonly githubImageURL: string;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.githubId = data.githubId;
    this.githubImageURL = `https://avatars.githubusercontent.com/u/${this.githubId}`;
  }

  /**
   * This method is supposed to be used when the user data is sent from the server
   * side to the client side. When it happens, the user data is serialized into JSON,
   * so it will lose any data that is not a primitive type. In order to deserialize
   * it, we need to use this method to create a new instance of the User class.
   */
  static fromJSON(user: User) {
    return new User(user);
  }
}
