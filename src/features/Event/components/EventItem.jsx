import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { joinEvent, leaveEvent } from '../../../api/eventApi';

function EventItem({ event, refetchEvent }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useHistory();
  const user = useSelector((state) => state.user.current);
  const isRegisted = event.registedStudent.some(
    (student) => student._id.toString() === user._id.toString()
  );
  console.log(isRegisted);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = () => {
    // navigate.push(`/post/${post._id}`);
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
      enqueueSnackbar(`Leave ${event.name} successfully!`);
      refetchEvent();
    } catch (error) {
      enqueueSnackbar('error');
    }
  };

  return (
    <div className="wrapper">
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
              {event.expiredDay.split('').splice(0, 10).join('')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
