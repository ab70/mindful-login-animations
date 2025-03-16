
import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PasswordRecovery from './pages/PasswordRecovery';
import Profile from './pages/Profile';
import LogsPage from './pages/LogsPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52bfcb',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
