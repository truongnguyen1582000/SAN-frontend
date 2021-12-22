import React, { useState } from 'react';
import { getPostList } from '../../../api/postApi';
import { useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import { Button, Dialog } from '@material-ui/core';

function PostListPage(props) {
  const [postList, setpostList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fectchPostList = async () => {
    try {
      const response = await getPostList();
      const data = response.data.data;
      setpostList(data);
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fectchPostList();
  }, []);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="mb-2"
      >
        Create new post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CreatePostForm
          handleCreatePost={fectchPostList}
          handleCloseForm={handleClose}
        />
      </Dialog>
      <PostList postList={postList} />
    </div>
  );
}

export default PostListPage;
