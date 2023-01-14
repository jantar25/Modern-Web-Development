import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { courseName,courseParts } from './courseData';


const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts= {courseParts} />
      <Total courseParts= {courseParts} />
    </div>
  );
};

export default App;
