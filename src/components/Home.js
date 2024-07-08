// In Home.js
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted');
    return () => {
      console.log('Home component unmounted');
    };
  }, []);

  return (
    <div>
      <h2>Main Component</h2>
    </div>
  );
};

export default Home;
