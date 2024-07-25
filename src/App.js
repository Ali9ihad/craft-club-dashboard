
import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // Import Ant Design styles
import Dashboard from './components/Dashboard';
import 'antd/dist/antd.css';
import { Components } from 'antd/lib/date-picker/generatePicker';

function App() {
  return (
    <div className="App">
      <Dashboard />

    </div>
  );
}

export default App;
