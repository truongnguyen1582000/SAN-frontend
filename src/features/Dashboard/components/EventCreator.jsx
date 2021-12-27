import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { createEvent } from '../../../api/eventApi';

function EventCreator({ refetchEvent }) {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [expireDay, setExpireDay] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        name: eventName,
        description: eventDesc,
        expiredDay: expireDay,
      });

      setEventName('');
      setEventDesc('');
      setExpireDay(new Date());
      enqueueSnackbar('Create event successfully', { variant: 'success' });
      refetchEvent();
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescChange = (e) => {
    setEventDesc(e.target.value);
  };

  const handleEDChange = (e) => {
    setExpireDay(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #000',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <TextField
        id="standard-basic"
        label="Event Name"
        className="mb-2"
        value={eventName}
        onChange={handleEventNameChange}
      />
      <TextField
        id="standard-basic"
        label="Event Description"
        className="mb-2"
        multiline
        rows={3}
        onChange={handleEventDescChange}
        value={eventDesc}
      />
      <Input
        id="exampleDate"
        name="date"
        placeholder="date placeholder"
        type="date"
        className="mb-2"
        value={expireDay}
        onChange={handleEDChange}
      />
      <Button color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}

export default EventCreator;
