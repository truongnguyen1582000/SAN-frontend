import React from 'react';
import EventItem from './EventItem';

function EventList({ eventList, refetchEvent }) {
  console.log(eventList);
  return (
    <ul>
      {eventList.map((event) => (
        <EventItem key={event._id} event={event} refetchEvent={refetchEvent} />
      ))}
    </ul>
  );
}

export default EventList;
