import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ commentList, postId, refectPost }) {
  console.log(commentList);

  return (
    <ul>
      {commentList.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          refectPost={refectPost}
          postId={postId}
        />
      ))}
    </ul>
  );
}

export default CommentList;
