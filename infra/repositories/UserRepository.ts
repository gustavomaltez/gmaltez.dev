import { User } from '@models';

export type CreateUserDTO = {
  name: string;
  githubId: string;
};

export abstract class UserRepository {
  abstract create(data: CreateUserDTO): Promise<User>;
  abstract getByGithubId(githubId: string): Promise<User | null>;
}
