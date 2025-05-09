import React from 'react';
import ComingSoon from './ComingSoon'; // Your existing component
import { FloatingDockDemo } from './components/FloatingDockDemo'; // Import FloatingDockDemo
import './App.css';

function App() {
  return (
    <div className="App">
      <ComingSoon /> {/* Your existing component */}
      
      {/* Add FloatingDockDemo below */}
      {/*<h2>Explore the Floating Dock</h2>*/}
      <FloatingDockDemo /> {/* Floating Dock Demo */}
    </div>
  );
}

export default App;
