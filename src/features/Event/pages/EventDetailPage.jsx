import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import EventItem from '../components/EventItem';
import { useEffect } from 'react';
import { getEvent } from '../../../api/eventApi';
import { useRouteMatch } from 'react-router-dom';
import RegisteredStudent from '../components/RegisteredList';

function EventDetailPage(props) {
  const [event, setEvent] = useState({});
  const { params } = useRouteMatch();
  const eventId = params.id;

  useEffect(
    () => {
      const fetchEvent = async () => {
        try {
          const response = await getEvent(eventId);
          setEvent(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEvent();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      {' '}
      <EventItem event={event} adminMode={true} />{' '}
      <Typography variant="h5" color="initial" style={{ textAlign: 'left' }}>
        StudentList
      </Typography>
      <RegisteredStudent studentList={event.registedStudent} />
    </div>
  );
}

export default EventDetailPage;
