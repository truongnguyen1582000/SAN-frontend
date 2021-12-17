import React from 'react';
import PostItem from './PostItem';

function PostList({ postList }) {
  return (
    <div>
      <ul>
        {postList.map((post, idx) => (
          <li key={idx}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
