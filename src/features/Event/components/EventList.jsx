import React from 'react';
import EventItem from './EventItem';

function EventList({ eventList, refetchEvent, adminMode, refetchEventAdmin }) {
  return (
    <ul>
      {eventList.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          refetchEvent={refetchEvent}
          refetchEventAdmin={refetchEventAdmin}
          adminMode={adminMode}
        />
      ))}
    </ul>
  );
}

export default EventList;
