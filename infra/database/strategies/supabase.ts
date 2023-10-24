import { SupabaseClient, createClient } from 'supabase';

import { BaseDatabase } from '@database';
import { Post, User, Comment } from '@models';
import { isDate, isStringArray } from '@utils/validators.ts';
import { extractTextMetadataAndContent } from '@utils/files.ts';
import { UserRepository, PostRepository, PostQuery } from '@repositories';

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

  public async getBySlug(slug: string, query?: PostQuery) {
    try {
      const { metadata, content } = await this._getPostDataBySlug(slug);
      const { title, snippet, tags, publishedAt } = this._extractPostMetadata(metadata);
      const post = new Post({ slug, title, content, snippet, publishedAt });
      post.tags = tags;
      if (query?.includeComments)
        post.comments = await this._getCommentsBySlug(slug);
      return post;
    } catch (_error) {
      return null;
    }
  }

  public async getAll(query?: PostQuery) {
    const files = Deno.readDir('./posts');
    const promises: Promise<Post | null>[] = [];
    for await (const file of files)
      promises.push(
        this.getBySlug(file.name.replace('.md', ''), query)
      );
    return (await Promise.all(promises)).filter(Boolean) as Post[];
  }

  // Helper methods ------------------------------------------------------------

  private async _getCommentsBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('post_slug', slug);

    if (error) throw error;
    if (!data) return [];

    const comments: Comment[] = [];
    for (const entry of data) {
      const { id, content, author } = entry;
      const createdAt = new Date(entry.created_at);
      if (isStringArray([id, content, author]) && isDate(createdAt))
        comments.push(new Comment({ id, content, author, createdAt }));
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