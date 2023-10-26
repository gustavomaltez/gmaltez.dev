import { SupabaseDatabase } from './strategies/supabase.ts';
import { FeatureFlagRepository, PostRepository, UserRepository } from '@repositories';

// Contract --------------------------------------------------------------------

export abstract class BaseDatabase {
  public abstract init: () => Promise<void>;
  public abstract readonly users: UserRepository;
  public abstract readonly posts: PostRepository;
  public abstract readonly featureFlags: FeatureFlagRepository;
}

// Database --------------------------------------------------------------------

const db = new SupabaseDatabase();

export { db };
