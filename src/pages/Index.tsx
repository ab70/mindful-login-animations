
import React from 'react';
import { Avatar, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LoginBackground from '@/components/LoginBackground';
import AnimatedLogo from '@/components/AnimatedLogo';
import LoginForm from '@/components/LoginForm';
import useLoginAnimation from '@/hooks/useLoginAnimation';
import '../styles/login.css';

const Index = () => {
  const { isVisible: contentVisible } = useLoginAnimation(100);
  const { isVisible: imageVisible } = useLoginAnimation(600);
  
  return (
    <div className="login-page">
      {/* Left side - Login form */}
      <div className="login-left">
        <LoginBackground />
        <LoginForm />
      </div>
      
      {/* Right side - Image and text */}
      <div className="login-right">
        <LoginBackground />
        <div className={`promo-card ${imageVisible ? 'visible' : ''}`}>
          <h2>Enterprise-Grade Identity Management</h2>
          <p>
            Secure your organization with our advanced IAM solution. Protect your assets, 
            control access, and streamline authentication with our powerful platform.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <CheckOutlined />
              </div>
              <div className="feature-text">
                <h4>Multi-Factor Auth</h4>
                <p>Enhanced security layers</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <CheckOutlined />
              </div>
              <div className="feature-text">
                <h4>SSO Integration</h4>
                <p>Seamless access control</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <CheckOutlined />
              </div>
              <div className="feature-text">
                <h4>Role-Based Access</h4>
                <p>Fine-grained permissions</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <CheckOutlined />
              </div>
              <div className="feature-text">
                <h4>Compliance</h4>
                <p>GDPR, HIPAA, ISO27001</p>
              </div>
            </div>
          </div>
          
          <div className="testimonials">
            <div className="avatar-group">
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&crop=faces&auto=format&fit=crop" />
              <Avatar src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&crop=faces&auto=format&fit=crop" />
              <Avatar src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&crop=faces&auto=format&fit=crop" />
            </div>
            <div className="testimonial-text">
              <span>10,000+</span> companies trust our platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
