import React from 'react';

function PostItem({ post }) {
  return (
    <div className="wrapper">
      <div className="left">
        <div className="left-top">
          <p>2</p>
          <p>votes</p>
        </div>
        <div className="left-bottom">
          <p>2</p>
          <p>answers</p>
        </div>
      </div>
      <div className="right">
        <p className="right-top">{post.postTitle}</p>
        <p className="right-center">{post.postContent}</p>
        <p className="right-bottom">{post.topics}</p>
      </div>
    </div>
  );
}

export default PostItem;
