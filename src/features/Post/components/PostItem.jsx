import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'reactstrap';

function PostItem({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="wrapper" onClick={handleRedirect}>
      <div className="left">
        <div className="left-top">
          <p>{post.upvote.length - post.downvote.length}</p>
          <p>votes</p>
        </div>
        <div className="left-bottom">
          <p>{post.postComment.length}</p>
          <p>answers</p>
        </div>
      </div>
      <div className="outer-right">
        <div className="right">
          <p className="right-top">{post.postTitle}</p>
          <p className="right-center">{post.postContent}</p>

          {post.topic && (
            <div className="topic-container">
              <span>Topic: </span>
              <Badge color="primary" className="right-bottom mt-1">
                {post.topic.name}
              </Badge>
            </div>
          )}
        </div>

        <div className="more-option">
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
  );
}

export default PostItem;
