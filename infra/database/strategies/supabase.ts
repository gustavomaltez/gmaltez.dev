import { SupabaseClient, createClient } from 'supabase';
import { BaseDatabase } from "@database";
import { PostRepository } from "../../repositories/PostRepository.ts";
import { UserRepository } from "@repositories";
import { User } from "../../models/User.ts";

// Core ------------------------------------------------------------------------

export class SupabaseDatabase implements BaseDatabase {
  public posts: PostRepository;
  public users: UserRepository;

  constructor() {
    const { url, key } = this.getCredentials();
    const client = createClient(url, key, { auth: { persistSession: false } });
    this.posts = new _PostRepository(client);
    this.users = new _UserRepository(client);
  }

  public init() {
    return Promise.resolve();
  }

  private getCredentials() {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_KEY');
    if (!url || !key) throw new Error('Supabase credentials not found');
    return { url, key };
  }
}

// Repositories ----------------------------------------------------------------

class BaseRepository {
  constructor(private _supabase: SupabaseClient) { }

  protected get supabase(): SupabaseClient {
    if (!this._supabase) throw new Error('Supabase not initialized');
    return this._supabase;
  }
}

class _PostRepository extends BaseRepository implements PostRepository {
  public getBySlug(_slug: string) {
    return Promise.resolve(null);
  }
}

class _UserRepository extends BaseRepository implements UserRepository {
  public async getByGithubId(githubId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('github_id', githubId);

    if (error) throw error;
    if (!data) return null;

    const user = new User();
    user.id = data.id;
    user.githubId = data.github_id;
    user.name = data.name;
    return user;
  }

  public async createByGithubId(githubId: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert({ github_id: githubId });

    if (error) throw error;
    if (!data) throw new Error('User not created');
    
    const user = new User();
    user.id = data.id;
    user.githubId = data.github_id;
    user.name = data.name;
    return user;
  }
}