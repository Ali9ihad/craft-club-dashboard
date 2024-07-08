import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // Import Ant Design styles
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
