import React, { useEffect, useState } from 'react';
import { getAllEvent } from '../../../api/eventApi';
import EventList from '../components/EventList';
import { CircularProgress } from '@material-ui/core';

function EventListPage(props) {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetchEvent = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEvent();
      setEventList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetchEvent();
  }, []);

  return (
    <div>
      {isLoading && <CircularProgress className="mb-2" />}
      <EventList eventList={eventList} refetchEvent={refetchEvent} />
    </div>
  );
}

export default EventListPage;
