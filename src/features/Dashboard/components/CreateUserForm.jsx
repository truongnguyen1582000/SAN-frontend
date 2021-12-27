import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'reactstrap';
import { createUser, getAll } from '../../../api/userApi';
import UserList from './UserList';

function CreateUserForm(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [course, setCourse] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [userList, setUserList] = useState([]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
  };
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        name,
        studentId,
        email,
        password,
        faculty,
        course,
        role: isChecked ? 'admin' : 'student',
      });
      enqueueSnackbar('Create user successfully', { variant: 'success' });
      refetchUser();
      setName('');
      setStudentId('');
      setCourse('');
      setFaculty('');
      setEmail('');
      setPassword('');
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  const refetchUser = async () => {
    try {
      const response = await getAll();
      setUserList(response.data);
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      const fetchUsers = async () => {
        try {
          const response = await getAll();
          setUserList(response.data);
        } catch (error) {
          enqueueSnackbar(error.data.message, { variant: 'error' });
        }
      };
      fetchUsers();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #000',
          borderRadius: '8px',
          padding: '8px',
        }}
      >
        <Typography variant="h5" color="initial">
          Create User
        </Typography>
        <TextField
          id="standard-basic"
          label="Student ID"
          value={studentId}
          onChange={handleStudentIdChange}
        />
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="standard-basic"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          id="standard-basic"
          label="Faculty"
          value={faculty}
          onChange={handleFacultyChange}
        />
        <TextField
          id="standard-basic"
          label="Course"
          value={course}
          onChange={handleCourseChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="ADMIN"
        />
        <Button color="primary" type="submit">
          Create
        </Button>
      </form>
      <UserList userList={userList} refetchUser={refetchUser} />
    </div>
  );
}

export default CreateUserForm;
