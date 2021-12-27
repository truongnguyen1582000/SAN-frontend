import React from 'react';
import { Table } from 'reactstrap';
import UserItem from './UserItem';

function UserList({ userList, refetchUser, tpMode }) {
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
            {!tpMode && <th>Action</th>}
            {tpMode && <th>Training Point</th>}
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <UserItem
              user={user}
              index={index}
              refetchUser={refetchUser}
              tpMode={tpMode}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
