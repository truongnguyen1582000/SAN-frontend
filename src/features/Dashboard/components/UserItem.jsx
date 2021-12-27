import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'reactstrap';
import { getTrainingPoint } from '../../../api/postApi';
import { deleteUser } from '../../../api/userApi';

function UserItem({ user, index, refetchUser, tpMode }) {
  const [tp, setTp] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      enqueueSnackbar('Delete user successfully', { variant: 'success' });
      refetchUser();
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  };

  useEffect(
    () => {
      (async () => {
        try {
          const response = await getTrainingPoint(user._id);
          console.log(response.data);
          setTp(response.data);
        } catch (error) {
          console.log({ error });
        }
      })();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{user.studentId}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.faculty}</td>
      <td>{user.course}</td>
      <td>{user.role}</td>
      {!tpMode && (
        <td>
          <Button color="danger" onClick={() => handleDeleteUser(user._id)}>
            Delete
          </Button>
        </td>
      )}
      {tpMode && <th>{tp}</th>}
    </tr>
  );
}

export default UserItem;
