import React, { useState } from 'react';
import { getPostList } from '../../../api/postApi';
import { useEffect } from 'react';
import PostList from '../components/PostList';
import CreatePostForm from '../components/CreatePostForm';
import { Button, CircularProgress, Dialog } from '@material-ui/core';

function PostListPage(props) {
  const [postList, setpostList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fectchPostList = async () => {
    try {
      setIsLoading(true);
      const data = await getPostList();
      setpostList(data.data);
      console.log(data);
      setIsLoading(false);
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
        className="mb-3"
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
      <br />
      {isLoading && <CircularProgress />}
      <PostList postList={postList} />
    </div>
  );
}

export default PostListPage;
