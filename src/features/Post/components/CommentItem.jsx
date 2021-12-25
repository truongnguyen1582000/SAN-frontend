import React from 'react';
import { Avatar, Grid } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  deleteComment,
  voteDownComment,
  voteUpComment,
} from '../../../api/postApi';
import randomColor from 'randomcolor';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function CommentItem({ comment, postId, refetchPost }) {
  const user = useSelector((state) => state.user.current);
  const isLikedPost = comment.upvoteC?.some((el) => el === user._id);
  const isDislikedPost = comment.downvoteC?.some((el) => el === user._id);
  const isAuthor = user._id === comment.commentBy?._id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVoteUp = async () => {
    if (isLikedPost) {
      enqueueSnackbar('You already vote up this comment', { variant: 'info' });
      return;
    }
    try {
      await voteUpComment(postId, comment._id);
      refetchPost();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const handleVoteDown = async () => {
    if (isDislikedPost) {
      enqueueSnackbar('You already vote up this comment', { variant: 'info' });
      return;
    }
    try {
      await voteDownComment(postId, comment._id);
      await refetchPost();
    } catch (error) {
      console.log({ error });
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(postId, comment._id);
      refetchPost();
      enqueueSnackbar('Delete comment success', { variant: 'info' });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
      console.log({ error });
    }
  };

  const handleReportComment = async () => {
    enqueueSnackbar('FUNCTION ON PROGRESS', { variant: 'info' });
  };

  return (
    <div>
      <Grid item style={{ width: '100%', marginBottom: '16px' }}>
        <div className="post-detail">
          <div className="post-detail-left">
            <ThumbUpAltIcon
              className={isLikedPost ? 'liked' : ''}
              style={{ cursor: 'pointer' }}
              onClick={() => handleVoteUp()}
            />
            <p className="vote-counter my-2">
              {comment.upvoteC?.length - comment.downvoteC?.length}
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
                    color: `#fff`,
                    backgroundColor: `green`,
                  }}
                >
                  {comment.commentBy?.name.split(' ').reverse()[0].split('')[0]}
                </Avatar>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {comment.commentBy?.name}
                </span>
              </div>

              <div className="post-detail-content mb-4 ml-2">
                {' '}
                {comment.comment}
              </div>
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
                {isAuthor ? (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleDeleteComment();
                    }}
                  >
                    Delete
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleReportComment();
                    }}
                  >
                    Report
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default CommentItem;
