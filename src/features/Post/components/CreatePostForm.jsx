import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createPost } from '../../../api/postApi';
import { getAll } from '../../../api/topicApi';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { DialogTitle } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function CreatePostForm({ handleCreatePost, handleCloseForm }) {
  const classes = useStyles();
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = React.useState('question');
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useHistory();

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getAllTopics = async () => {
      try {
        const response = await getAll();
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTopics();
  }, []);

  const handleChange = (event) => {
    setPostType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost({
        postType: postType,
        postTitle: postTitle,
        postContent: postContent,
        topicId: selectedTopic,
      });
      handleCreatePost();
    } catch (error) {
      console.log({ error });
      if (error.status === 401) {
        console.log('object');
        enqueueSnackbar('Please Login First', { variant: 'error' });
        navigate.push('/login');
      }
    }
    setPostTitle('');
    setPostContent('');
  };

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <p>Create post</p>

      <label htmlFor="">Post title</label>
      <input
        type="text"
        name="postTitle"
        value={postTitle}
        onChange={handlePostTitleChange}
      />
      <br />
      <label htmlFor="">Post content</label>
      <input
        type="text"
        value={postContent}
        onChange={handlePostContentChange}
        name="postContent"
      />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Post type</FormLabel>
        <RadioGroup name="gender1" value={postType} onChange={handleChange}>
          <FormControlLabel
            value="question"
            control={<Radio />}
            label="Question"
          />
          <FormControlLabel value="blog" control={<Radio />} label="Blog" />
        </RadioGroup>
      </FormControl>
      <br />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Topics</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {topics.map((topic) => (
            <MenuItem value={topic._id}>{topic.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <button onClick={() => handleCloseForm()}>post</button>
    </form>
  );
}

export default CreatePostForm;
