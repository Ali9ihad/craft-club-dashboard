<<<<<<< HEAD
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Craft Club Dashboard.</p>
=======
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
>>>>>>> 66686fa8b93c76ec9eeca77b7befeef9a9e51f46
    </div>
  );
};

export default Home;
