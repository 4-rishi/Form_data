// src/App.jsx
import React from 'react';
import Form from './Form';

const App = ({ data }) => {
  return (
    <div>
      <h1>Medical Drive</h1>
      <Form data={data} />
    </div>
  );
};

export default App;
