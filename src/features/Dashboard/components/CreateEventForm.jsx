import React, { useEffect, useState } from 'react';
import { getAllEvent } from '../../../api/eventApi';
import EventList from '../../Event/components/EventList';
import EventCreator from './EventCreator';
import { Button, CircularProgress, Dialog } from '@material-ui/core';

function CreateEventForm(props) {
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
      <EventCreator refetchEvent={refetchEvent} />
      {isLoading && <CircularProgress className="mb-2" />}
      <EventList
        eventList={eventList}
        refetchEventAdmin={refetchEvent}
        adminMode="true"
      />
    </div>
  );
}

export default CreateEventForm;
