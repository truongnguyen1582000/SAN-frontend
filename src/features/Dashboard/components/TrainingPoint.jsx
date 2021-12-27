import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { getAll } from '../../../api/userApi';
import UserList from './UserList';

function TrainingPoint(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [userList, setUserList] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await getAll();
      setUserList(response.data);
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      fetchUser();
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div>
      <UserList userList={userList} tpMode={true} />
    </div>
  );
}

export default TrainingPoint;
