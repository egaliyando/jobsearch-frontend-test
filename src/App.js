import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobDetail from './pages/jobDetail';
import Jobs from './pages/jobs';
import Auth from './pages/auth';

function App() {
  const typeOfLogin = ['GMAIL', 'FACEBOOK'];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth typeOfLogin={typeOfLogin} />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
