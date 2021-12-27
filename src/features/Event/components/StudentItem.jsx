import React from 'react';

function StudentItem({ student }) {
  console.log(student);
  return <div>{student.name}</div>;
}

export default StudentItem;
