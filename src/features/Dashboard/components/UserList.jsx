import { useSnackbar } from 'notistack';
import React from 'react';
import { Button, Table } from 'reactstrap';
import { deleteUser } from '../../../api/userApi';

function UserList({ userList, refetchUser }) {
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

  return (
    <div style={{ marginTop: '16px' }}>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Student id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Faculty</th>
            <th>Course</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr>
              <th scope="row">{index}</th>
              <td>{user.studentId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.faculty}</td>
              <td>{user.course}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteUser(user._id)}
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

export default UserList;
