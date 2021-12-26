import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchPost } from '../../api/postApi';
import queryString from 'query-string';
import PostList from '../Post/components/PostList';
import Typography from '@mui/material/Typography';

function SearchPostList(props) {
  const location = useLocation();
  const [postList, setPostList] = useState([]);

  const x = location.search.split('=').reverse()[0];

  useEffect(() => {
    (async () => {
      try {
        const data = await searchPost(location.search);
        console.log(data);
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location.search]);

  return (
    <div>
      <Typography variant="h5" color="initial" className="mb-2">
        {postList.length !== 0 && `Search results with ${x}`}

        {postList.length === 0 && `No result with ${x}`}
      </Typography>
      <PostList postList={postList} />
    </div>
  );
}

export default SearchPostList;
