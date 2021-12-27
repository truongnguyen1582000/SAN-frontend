import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Table } from 'reactstrap';
import { useSnackbar } from 'notistack';
import { createTopic, deleteTopic, getAll } from '../../../api/topicApi';

function Topic(props) {
  const [topics, setTopics] = useState([]);
  const [name, setName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTopic({ name: name });
      enqueueSnackbar('Create topic successfully', { variant: 'success' });
      fetchTopic();
      setName('');
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const fetchTopic = async () => {
    try {
      const response = await getAll();
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      fetchTopic();
    },
    // eslint-disable-next-line
    []
  );

  const handleDeleteTopic = async (id) => {
    try {
      await deleteTopic(id);
      enqueueSnackbar('Delete successfully', { variant: 'success' });
      fetchTopic();
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Topic Name"
          value={name}
          variant="filled"
          onChange={handleChange}
        />
        <Button color="primary" style={{ marginLeft: '16px', height: '56px' }}>
          ADD
        </Button>
      </form>

      <Table className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Topic Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic._id}>
              <th scope="row">{index}</th>
              <td>{topic.name}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteTopic(topic._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Topic;
