import React, { useState } from 'react';
import { getPostList } from '../../../api/postApi';
import { useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';

function PostListPage(props) {
  const [postList, setpostList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await getPostList();
        const data = response.data.data;
        setpostList(data);
        console.log(data);
      } catch (error) {
        console.log({ error });
      }
    };
    getList();
  }, []);
  return (
    <div>
      <CreatePostForm />
      <PostList postList={postList} />
    </div>
  );
}

export default PostListPage;
