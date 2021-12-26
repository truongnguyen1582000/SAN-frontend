import React, { useEffect, useState } from 'react';
import { getAllEvent } from '../../../api/eventApi';
import EventList from '../components/EventList';

function EventListPage(props) {
  const [eventList, setEventList] = useState([]);

  const refetchEvent = async () => {
    try {
      const response = await getAllEvent();
      setEventList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetchEvent();
  }, []);

  return (
    <div>
      <EventList eventList={eventList} refetchEvent={refetchEvent} />
    </div>
  );
}

export default EventListPage;
