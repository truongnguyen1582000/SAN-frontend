import React, { useState } from 'react';
import { createPost } from '../../../api/postApi';

function CreatePostForm(props) {
  const [value, setvalue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPost(e.target.value);
    setvalue('');
  };

  const handleChange = (e) => {
    setvalue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Create post</p>
      <input type="text" value={value} onChange={handleChange} />
      <button>post</button>
    </form>
  );
}

export default CreatePostForm;
