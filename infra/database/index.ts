import { SupabaseDatabase } from "./strategies/supabase.ts";

// Contract --------------------------------------------------------------------

export interface Database {
  init: () => Promise<void>;
  users: {
    createByGithubId: (githubId: string) => Promise<User>;
    getByGithubId: (githubId: string) => Promise<User | null>;
  };
  comments: {
    update: (comment: Comment) => Promise<Comment>;
    getAllByPostSlug: (slug: string) => Promise<Comment[]>;
    add: (comment: Exclude<Comment, 'id'>) => Promise<Comment>;
    upvote: (commentId: number, userId: number) => Promise<Vote>;
    downvote: (commentId: number, userId: number) => Promise<Vote>;
  };
}

// Types -----------------------------------------------------------------------

export type User = {
  id: number;
  github_id?: string;
};

export type Comment = {
  id: number;
  post_slug: string;
  user_id: number;
  parent_comment_id?: number | null;
  content: string;
};

export type Vote = {
  id: number;
  comment_id: number;
  user_id: number;
  vote_type: boolean;
};

// Database --------------------------------------------------------------------

const db = new SupabaseDatabase();
db.init();

export { db }

