import { Comment } from '@models';
import { Comment as CommentEntry } from '@components';
import { useState } from 'preact/hooks';

// Types -----------------------------------------------------------------------

type Props = {
  comments: Comment[];
  onCommentSubmit: (content: string) => void;
  onReplySubmit: (content: string, commentId: string) => void;
};

// Wrapper ---------------------------------------------------------------------

export default function Wrapper(props: Props) {
  return (
    <CommentIsland
      {...props}
      comments={props.comments.map(Comment.fromJSON)}
    />
  );
}

// Component -------------------------------------------------------------------

function CommentIsland(props: Props) {
  const [comments] = useState<Comment[][]>(getSortedComments(props.comments));

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='font-bold text-xl'>Comments</h2>
      <div className='flex flex-col gap-4'>
        {comments.map(comments => (
          <CommentGroup comments={comments} />
        ))}
      </div>
    </div>
  );
}

// Sub-components --------------------------------------------------------------

function CommentGroup(props: { comments: Comment[] }) {
  const [showReplies, setShowReplies] = useState(false);

  if (props.comments.length === 1) return <CommentEntry comment={props.comments[0]} />;

  const [parent, ...replies] = props.comments;

  return (
    <div className='flex flex-col'>
      <CommentEntry comment={parent} />
      <div className='flex flex-row gap-2 text-xs text-text-secondary mt-1'>
        <RepliesButton
          count={replies.length}
          showReplies={showReplies}
          onClick={() => setShowReplies(!showReplies)}
        />
        <button className='hover:text-primary'>Reply</button>
      </div>
      <CommentReplies
        comments={replies}
        isVisible={showReplies}
      />
    </div>
  );
}

function RepliesButton(props: { count: number; showReplies: boolean; onClick: () => void }) {
  if (props.count === 0) return <></>;
  return (
    <button
      onClick={props.onClick}
      className='hover:text-primary'
    >
      {getRepliesText(props.count, props.showReplies)}
    </button>
  );
}

function CommentReplies(props: { comments: Comment[]; isVisible: boolean }) {
  if (!props.isVisible) return <></>;
  return (
    <div className='flex flex-col gap-2 ml-4 mt-2'>
      {props.comments.map(comment => (
        <CommentEntry comment={comment} />
      ))}
    </div>
  );
}

// Helpers ---------------------------------------------------------------------

function getRepliesText(count: number, showReplies: boolean) {
  if (count === 1) return 'View 1 reply';
  if (showReplies) return `Hide ${count} replies`;
  return `View ${count} replies`;
}

function getSortedComments(input: Comment[]) {
  const comments: Record<string, Comment[]> = {};
  for (const comment of input) {
    const id = comment.parentId ?? comment.id;
    if (!comments[id]) comments[id] = [];
    comments[id].push(comment);
  }
  return Object.values(comments).map(sortByDate);
}

function sortByDate(comments: Comment[]) {
  return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
