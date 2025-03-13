
import React from 'react';
import { SafetyCertificateFilled, LockFilled } from '@ant-design/icons';
import '../styles/login.css';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="login-logo-wrapper">
      <div className="login-logo-icon">
        <SafetyCertificateFilled 
          style={{ 
            fontSize: 36, 
            color: '#1677ff',
            position: 'relative',
            zIndex: 2,
          }} 
        />
        <LockFilled 
          style={{ 
            fontSize: 18, 
            color: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }} 
        />
      </div>
      <div className="login-logo-text">
        <h1>SecureID</h1>
        <p>Identity Management</p>
      </div>
    </div>
  );
};

export default AnimatedLogo;
