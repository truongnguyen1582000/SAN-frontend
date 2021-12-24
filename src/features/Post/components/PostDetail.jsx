import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getPostItem } from '../../../api/postApi';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import randomColor from 'randomcolor';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function PostDetail(props) {
  const [post, setPost] = useState({});
  const { params } = useRouteMatch();
  const postId = params.id;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getPostItem(postId);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.log({ error });
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
                  className="liked"
                  style={{ cursor: 'pointer' }}
                />
                <p className="vote-counter my-2">
                  {post.upvote?.length - post.downvote?.length}
                </p>
                <ThumbDownAltIcon style={{ cursor: 'pointer' }} />
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

        <Typography variant="h5" color="initial" style={{ textAlign: 'left' }}>
          Answer
        </Typography>
      </Container>
    </div>
  );
}

export default PostDetail;
