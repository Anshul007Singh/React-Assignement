import React from 'react';
import './Table.css'

const Table = ({ data }) => {
    console.log(data,'djdjdjjjdj')
  return (
    <table>
      <thead>
        <tr>
          <th>Se. No.</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
