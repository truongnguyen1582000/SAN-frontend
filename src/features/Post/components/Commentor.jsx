import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import { TextField } from '@material-ui/core';
import { createComment } from '../../../api/postApi';
import { useSnackbar } from 'notistack';

function Commentor({ postId, refectPost }) {
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      await createComment(postId, { comment: value });
      setValue('');
      refectPost();
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="d-flex align-item-center" onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Write your comment..."
        style={{ width: '100%', padding: '4px' }}
      />
      <button
        style={{
          outline: 'none',
          border: 'none',
          backgroundColor: '#fff',
          marginBottom: '8px',
        }}
      >
        <SendIcon style={{ color: 'blue', cursor: 'pointer' }}></SendIcon>
      </button>
    </form>
  );
}

export default Commentor;
