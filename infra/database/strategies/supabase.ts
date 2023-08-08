import { SupabaseClient, createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Database, User, Comment, Vote } from "../index.ts";

// This is just a draft to test the Supabase integration
// ToDo: Better structure Entities and Repositories
// ToDo: Refactor this to be easier to read and maintain

export class SupabaseDatabase implements Database {
  private _supabase: SupabaseClient | null = null;

  public init() {
    this._supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_KEY") || "",
      { auth: { persistSession: false } }
    );
    return Promise.resolve();
  }

  private get supabase() {
    if (!this._supabase) throw new Error("Database not initialized");
    return this._supabase;
  }

  // User ----------------------------------------------------------------------

  public users = {
    createByGithubId: async (githubId: string): Promise<User> => {
      const { data, error } = await this.supabase
        .from("users")
        .insert({ github_id: githubId })
        .select("*")
        .single<User>();

      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return {
        id: data.id,
        github_id: data.github_id,
      };
    },
    getByGithubId: async (githubId: string): Promise<User | null> => {
      const { data, error } = await this.supabase
        .from("users")
        .select("*")
        .eq("github_id", githubId)
        .maybeSingle<User>();
      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        github_id: data.github_id,
      };
    },
  };

  // Comments ------------------------------------------------------------------

  public comments = {
    update: async (comment: Comment): Promise<Comment> => {
      const { data, error } = await this.supabase
        .from("comments")
        .update(comment)
        .eq("id", comment.id)
        .single<Comment>();
      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return {
        id: data.id,
        user_id: data.user_id,
        content: data.content,
        post_slug: data.post_slug,
        parent_comment_id: data.parent_comment_id,
      };
    },
    getAllByPostSlug: async (slug: string): Promise<Comment[]> => {
      const { data, error } = await this.supabase
        .from("comments")
        .select("*")
        .eq("post_slug", slug);
      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return data.map((comment) => ({
        id: comment.id,
        user_id: comment.user_id,
        content: comment.content,
        post_slug: comment.post_slug,
        parent_comment_id: comment.parent_comment_id,
      }));
    },
    add: async (comment: Exclude<Comment, "id">): Promise<Comment> => {
      const { data, error } = await this.supabase
        .from("comments")
        .insert(comment)
        .single<Comment>();
      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return {
        id: data.id,
        user_id: data.user_id,
        content: data.content,
        post_slug: data.post_slug,
        parent_comment_id: data.parent_comment_id,
      };
    },
    upvote: async (commentId: number, userId: number): Promise<Vote> => {
      const { data, error } = await this.supabase
        .from("votes")
        .insert({ comment_id: commentId, user_id: userId, vote_type: true })
        .single<Vote>();
      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return {
        id: data.id,
        user_id: data.user_id,
        vote_type: data.vote_type,
        comment_id: data.comment_id,
      };
    },
    downvote: async (commentId: number, userId: number): Promise<Vote> => {
      const { data, error } = await this.supabase
        .from("votes")
        .insert({ comment_id: commentId, user_id: userId, vote_type: false })
        .single<Vote>();
      if (error) throw error;
      if (!data) throw new Error("No data returned");

      return {
        id: data.id,
        user_id: data.user_id,
        vote_type: data.vote_type,
        comment_id: data.comment_id,
      };
    }
  };
}