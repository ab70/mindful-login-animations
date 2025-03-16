
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
          borderRadius: 6,
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#f5222d',
          colorInfo: '#1890ff',
        },
        components: {
          Menu: {
            darkItemBg: 'transparent',
            darkItemHoverBg: 'rgba(255, 255, 255, 0.1)',
            darkItemSelectedBg: 'rgba(255, 255, 255, 0.2)',
          },
          Layout: {
            bodyBg: '#f5f7fa',
          },
          Card: {
            colorBorderSecondary: '#f0f0f0',
          },
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
