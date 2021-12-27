import React from 'react';
import { Table } from 'reactstrap';
// import StudentItem from './StudentItem';

function RegisteredList({ studentList }) {
  console.log(studentList);
  return (
    <ul>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {studentList?.map((student, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{student.name}</td>
              <td>x</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ul>
  );
}

export default RegisteredList;
