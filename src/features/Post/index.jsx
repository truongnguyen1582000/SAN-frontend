import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import PostDetail from '../Post/components/PostDetail';

function Post(props) {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/" element={<PostListPage />} exact />
      </Routes>
    </div>
  );
}

export default Post;
