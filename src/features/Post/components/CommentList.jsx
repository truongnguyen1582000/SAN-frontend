import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ commentList, postId, refetchPost }) {
  const commentLists = commentList;

  return (
    <ul>
      {commentLists?.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          refetchPost={refetchPost}
          postId={postId}
        />
      ))}
    </ul>
  );
}

export default CommentList;
