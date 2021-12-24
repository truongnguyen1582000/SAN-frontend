import React from 'react';
import { Grid } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import randomColor from 'randomcolor';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { voteDownComment, voteUpComment } from '../../../api/postApi';

function CommentItem({ comment, postId, refetchPost }) {
  const user = useSelector((state) => state.user.current);
  const isLikedPost = comment.upvote?.some((el) => el._id === user._id);
  const isDislikedPost = comment.downvote?.some((el) => el._id === user._id);
  const { enqueueSnackbar } = useSnackbar();
  const { params } = useRouteMatch();

  const handleVoteUp = async () => {
    if (isLikedPost) {
      enqueueSnackbar('You already vote up this post', { variant: 'info' });
      return;
    }
    try {
      await voteUpComment(postId, comment._id);
      await refetchPost();
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
      await voteDownComment(postId, comment._id);
      await refetchPost();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  return (
    <div>
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
                  {/* <Avatar
                    style={{
                      width: '28px',
                      height: '28px',
                      marginRight: '6px',
                      color: `${randomColor()}`,
                      backgroundColor: `${randomColor()}`,
                    }}
                  >
                    T
                  </Avatar> */}
                  <span>{comment.author?.name}</span>
                </div>
                <div
                  className="post-detail-title"
                  style={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  {comment.postTitle}
                </div>
                {/* <div className="post-detail-content">{post.postContent}</div> */}
              </div>

              {/* <div style={{ marginLeft: 'auto' }}>
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
              </div> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentItem;
