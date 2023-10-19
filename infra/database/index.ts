import { PostRepository, UserRepository } from "@repositories";
import { SupabaseDatabase } from './strategies/supabase.ts';

// Contract --------------------------------------------------------------------

export abstract class BaseDatabase {
  public abstract init: () => Promise<void>;
  public abstract readonly users: UserRepository;
  public abstract readonly posts: PostRepository;
}

// Database --------------------------------------------------------------------

const db = new SupabaseDatabase();

export { db }

