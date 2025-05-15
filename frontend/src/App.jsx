import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SolanaProvider } from './contexts/SolanaContext';
import Dashboard from './pages/Dashboard';
import AgentDetails from './pages/AgentDetails';

const App = () => {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agent/:id" element={<AgentDetails />} />
        </Routes>
      </Router>
    </SolanaProvider>
  );
};

export default App;
