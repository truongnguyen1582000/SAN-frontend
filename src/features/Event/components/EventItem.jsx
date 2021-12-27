import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { deleteEvent, joinEvent, leaveEvent } from '../../../api/eventApi';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function EventItem({ event, refetchEvent, adminMode, refetchEventAdmin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useHistory();
  const user = useSelector((state) => state.user.current);
  const isRegisted = event.registedStudent?.some(
    (student) => student._id.toString() === user._id.toString()
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    try {
      await deleteEvent(event._id);
      refetchEventAdmin();
      enqueueSnackbar('Delete event successfully', { variant: 'success' });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleRedirect = () => {
    if (adminMode) {
      navigate.push(`/event/${event._id}`);
    }
  };

  const handleJoinEvent = async () => {
    try {
      await joinEvent(event._id);
      enqueueSnackbar(`Join ${event.name} successfully!`, {
        variant: 'success',
      });
      refetchEvent();
    } catch (error) {
      enqueueSnackbar('error');
    }
  };

  const handleLeaveEvent = async () => {
    try {
      await leaveEvent(event._id);
      enqueueSnackbar(`Leave ${event.name} successfully!`, {
        variant: 'success',
      });
      refetchEvent();
    } catch (error) {
      enqueueSnackbar('error');
    }
  };

  return (
    <div className="wrapper" onClick={handleRedirect}>
      {!adminMode && (
        <div className="left">
          {isRegisted ? (
            <Button
              color="danger"
              disabled={event.status === 'closed'}
              onClick={handleLeaveEvent}
            >
              Leave
            </Button>
          ) : (
            <Button
              color="primary"
              disabled={event.status === 'closed'}
              onClick={handleJoinEvent}
            >
              JOIN
            </Button>
          )}
        </div>
      )}
      <div className="outer-right">
        <div className="right" onClick={handleRedirect}>
          <p
            className="right-top mb-2"
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            {event.name}
          </p>
          <p className="right-center">{event.description}</p>
          <div className="mt-2 d-flex">
            Status:{' '}
            <Badge
              color={event.status === 'open' ? 'primary' : 'danger'}
              style={{ marginRight: '4px' }}
            >
              {event.status}
            </Badge>
            {'  '} Expire Date:{' '}
            <Badge color="info">
              {event.expiredDay?.split('').splice(0, 10).join('')}
            </Badge>
          </div>
        </div>
        {adminMode && (
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
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventItem;
