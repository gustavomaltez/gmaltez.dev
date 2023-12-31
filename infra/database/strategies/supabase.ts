import { SupabaseClient, createClient } from 'supabase';

import { BaseDatabase } from '@database';
import { Post, User, Comment } from '@models';
import { isDate, isStringArray } from '@utils/validators.ts';
import { extractTextMetadataAndContent } from '@utils/files.ts';
import {
  PostQuery,
  CreateUserDTO,
  UserRepository,
  PostRepository,
  FeatureFlagRepository,
} from '@repositories';

// Core ------------------------------------------------------------------------

export class SupabaseDatabase implements BaseDatabase {
  public readonly posts: PostRepository;
  public readonly users: UserRepository;
  public readonly featureFlags: FeatureFlagRepository;

  constructor() {
    const { url, key } = this.getCredentials();
    const client = createClient(url, key, { auth: { persistSession: false } });
    this.posts = new _PostRepository(client);
    this.users = new _UserRepository(client);
    this.featureFlags = new _FeatureFlagRepository(client);
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
  constructor(private _supabase: SupabaseClient) {}

  protected get supabase(): SupabaseClient {
    if (!this._supabase) throw new Error('Supabase not initialized');
    return this._supabase;
  }
}

class _PostRepository extends BaseRepository implements PostRepository {
  public async getBySlug(slug: string, query?: PostQuery) {
    try {
      const { metadata, content } = await this._getPostDataBySlug(slug);
      const { title, snippet, tags, publishedAt } = this._extractPostMetadata(metadata);
      const comments = query?.includeComments ? await this._getCommentsBySlug(slug) : [];
      return new Post({ slug, title, snippet, tags, publishedAt, content, comments });
    } catch (_error) {
      return null;
    }
  }

  public async getAll(query?: PostQuery) {
    const files = Deno.readDir('./posts');
    const promises: Promise<Post | null>[] = [];
    for await (const file of files)
      promises.push(this.getBySlug(file.name.replace('.md', ''), query));
    return (await Promise.all(promises)).filter(Boolean) as Post[];
  }

  // Helper methods ------------------------------------------------------------

  private async _getCommentsBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*, author: user_id (id, github_id, name)')
      .eq('post_slug', slug);

    if (error) throw error;
    if (!data) return [];

    const comments: Comment[] = [];
    // ToDo: Improve this
    for (const entry of data) {
      const { id, content, parent_id } = entry;
      const createdAt = new Date(entry.created_at);
      const { id: authorId, name: authorName, github_id: authorGitHubId } = entry.author;
      if (!isStringArray([id, content, authorId, authorName]) || !isDate(createdAt)) continue;
      const author = new User({
        id: authorId,
        name: authorName,
        githubId: authorGitHubId,
      });
      comments.push(new Comment({ id, author, content, createdAt, parentId: parent_id }));
    }
    return comments;
  }

  private async _getPostDataBySlug(slug: string) {
    const rawData = await Deno.readTextFile(`./posts/${slug}.md`);
    return extractTextMetadataAndContent(rawData);
  }

  private _extractPostMetadata(metadata: Record<string, string>) {
    const { title, snippet, tags } = metadata;
    const publishedAt = new Date(metadata.published_at);
    if (!isStringArray([title, snippet, tags]) || !isDate(publishedAt))
      throw new Error('Invalid or missing post metadata.');
    return { title, snippet, tags: metadata.tags.split(','), publishedAt };
  }
}

class _UserRepository extends BaseRepository implements UserRepository {
  public async getByGithubId(githubId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('github_id', githubId);

    if (error) throw error;
    const { id, name, github_id } = data;
    if (!data || !isStringArray([id, github_id, name])) return null;
    return new User({ id, githubId: github_id, name });
  }

  public async create(params: CreateUserDTO): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert({ github_id: params.githubId, name: params.name });

    if (error) throw error;
    const { id, name, github_id } = data;
    if (!data || !isStringArray([id, github_id, name])) throw new Error('User not created');
    return new User({ id, githubId: github_id, name });
  }
}

class _FeatureFlagRepository extends BaseRepository implements FeatureFlagRepository {
  public async isEnabled(name: string) {
    const { data, error } = await this.supabase
      .from('features')
      .select('enabled')
      .eq('name', name)
      .single();
    if (error) throw error;
    if (!data) return false;
    return !!data.enabled;
  }
}
