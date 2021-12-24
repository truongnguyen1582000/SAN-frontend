import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getPostItem, voteDownPost, voteUpPost } from '../../../api/postApi';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import randomColor from 'randomcolor';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import CommentList from './CommentList';
import Commentor from './Commentor';

function PostDetail(props) {
  const [post, setPost] = useState({});
  const { params } = useRouteMatch();
  const postId = params.id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.current);
  const isLikedPost = post.upvote?.some((el) => el._id === user._id);
  const isDislikedPost = post.downvote?.some((el) => el._id === user._id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVoteUp = async () => {
    if (isLikedPost) {
      enqueueSnackbar('You already vote up this post', { variant: 'info' });
      return;
    }
    try {
      await voteUpPost(post._id);
      await refetchPost();
      console.log('runed');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleVoteDown = async () => {
    if (isDislikedPost) {
      enqueueSnackbar('You already vote up this post', { variant: 'info' });
      return;
    }
    try {
      await voteDownPost(post._id);
      await refetchPost();
      console.log('runed');
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const refetchPost = async () => {
    try {
      const response = await getPostItem(postId);
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getPostItem(postId);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        enqueueSnackbar(error, { variant: 'error' });
      }
    };
    getPost();
  }, []);
  return (
    <div>
      <Container>
        <Grid container spacing={1}>
          <Grid item style={{ width: '100%' }}>
            <div className="post-detail">
              <div className="post-detail-left">
                <ThumbUpAltIcon
                  className={isLikedPost ? 'liked' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleVoteUp()}
                />
                <p className="vote-counter my-2">
                  {post.upvote?.length - post.downvote?.length}
                </p>
                <ThumbDownAltIcon
                  className={isDislikedPost ? 'liked' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleVoteDown()}
                />
              </div>
              <div className="post-detail-right">
                <div className="inner-left">
                  <div className="user-info">
                    <Avatar
                      style={{
                        width: '28px',
                        height: '28px',
                        marginRight: '6px',
                        color: `${randomColor()}`,
                        backgroundColor: `${randomColor()}`,
                      }}
                    >
                      T
                    </Avatar>
                    <span>{post.author?.name}</span>
                  </div>
                  <div
                    className="post-detail-title"
                    style={{ fontWeight: 'bold', fontSize: '20px' }}
                  >
                    {post.postTitle}
                  </div>
                  <div className="post-detail-content">{post.postContent}</div>
                </div>

                <div style={{ marginLeft: 'auto' }}>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Report</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <hr />

        <Typography
          variant="h5"
          color="initial"
          style={{ textAlign: 'left', marginBottom: '8px' }}
        >
          {post.type === 'question' ? 'Answer' : 'Comment'}
        </Typography>
        <Commentor postId={post._id} refectPost={refetchPost} />
        <CommentList
          commentList={post.postComment}
          postId={post._id}
          refectPost={refetchPost}
        />
      </Container>
    </div>
  );
}

export default PostDetail;
