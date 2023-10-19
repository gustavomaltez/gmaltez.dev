import { User } from "@models";

export abstract class UserRepository {
  abstract createByGithubId(githubId: string): Promise<User>;
  abstract getByGithubId(githubId: string): Promise<User | null>;
}