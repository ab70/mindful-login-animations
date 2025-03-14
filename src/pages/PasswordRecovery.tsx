
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { 
  MailOutlined, 
  KeyOutlined, 
  SafetyCertificateFilled,
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginBackground from '../components/LoginBackground';
import AnimatedLogo from '../components/AnimatedLogo';
import useLoginAnimation from '../hooks/useLoginAnimation';
import '../styles/login.css';

const PasswordRecovery = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [recoveryStatus, setRecoveryStatus] = useState('idle');
  const navigate = useNavigate();
  const { isVisible: formVisible } = useLoginAnimation({ delay: 300 });
  const { isVisible: footerVisible } = useLoginAnimation({ delay: 900 });
  
  const [glassActive, setGlassActive] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setGlassActive(true);
    }, 500);
  }, []);
  
  const handleRecovery = async (values) => {
    const { email } = values;
    
    if (!email) {
      notification.error({
        message: 'Error',
        description: 'Please enter your email address',
      });
      return;
    }
    
    setLoading(true);
    setRecoveryStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecoveryStatus('success');
      setEmailSent(true);
      
      notification.success({
        message: 'Recovery Email Sent',
        description: 'Check your inbox for password reset instructions',
      });
    } catch (error) {
      console.error('Password recovery error:', error);
      setRecoveryStatus('error');
      
      notification.error({
        message: 'Recovery failed',
        description: 'An error occurred, please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getButtonIcon = () => {
    if (loading) {
      return <span className="loading-spinner" />;
    }
    
    if (recoveryStatus === 'success') {
      return <CheckCircleFilled style={{ color: '#fff' }} />;
    }
    
    if (recoveryStatus === 'error') {
      return <CloseCircleFilled style={{ color: '#fff' }} />;
    }
    
    return <ArrowRightOutlined />;
  };
  
  return (
    <div className="login-page">
      <div className="login-left">
        <LoginBackground />
        <div className={`login-card ${glassActive ? 'glass-active' : ''}`}>
          <div className="login-card-inner">
            <div className="login-card-icon">
              <SafetyCertificateFilled className="login-shield-icon" />
              <KeyOutlined className="login-user-icon" />
            </div>
            
            <h2 className="login-title">Password Recovery</h2>
            <p className="login-subtitle">
              {emailSent 
                ? 'Check your email for reset instructions' 
                : 'Enter your email to reset your password'}
            </p>
            
            {!emailSent ? (
              <Form
                name="recovery-form"
                onFinish={handleRecovery}
                size="large"
                layout="vertical"
                className={formVisible ? 'form-visible' : ''}
              >
                <div className="login-form-item">
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input 
                      prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} 
                      placeholder="Email Address" 
                      type="email"
                      disabled={loading}
                      className="glass-input"
                    />
                  </Form.Item>
                </div>
                
                <div className="login-form-item">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={`login-button ${recoveryStatus === 'success' ? 'success' : ''} ${recoveryStatus === 'error' ? 'error' : ''}`}
                    loading={loading}
                    icon={getButtonIcon()}
                  >
                    {loading ? '' : recoveryStatus === 'success' ? 'Sent' : recoveryStatus === 'error' ? 'Error' : 'Send Reset Link'}
                  </Button>
                </div>
              </Form>
            ) : (
              <div className={`recovery-success ${formVisible ? 'form-visible' : ''}`}>
                <div className="success-icon">
                  <CheckCircleFilled style={{ fontSize: '48px', color: '#52bfcb' }} />
                </div>
                <p>We've sent recovery instructions to your email</p>
                <Button 
                  type="primary" 
                  onClick={() => navigate('/')} 
                  className="login-button"
                >
                  Return to Login
                </Button>
              </div>
            )}
            
            <div className={`login-footer ${footerVisible ? 'footer-visible' : ''}`}>
              Remember your password? <a href="/" className="signup-link">Sign in <ArrowRightOutlined /></a>
            </div>
          </div>
          
          <div className="login-card-decoration">
            <div className="glass-bubble glass-bubble-1"></div>
            <div className="glass-bubble glass-bubble-2"></div>
            <div className="glass-bubble glass-bubble-3"></div>
            <div className="glass-bubble glass-bubble-4"></div>
            <div className="glass-bubble glass-bubble-5"></div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <LoginBackground />
        <div className="recovery-info-card">
          <h2>Forgot Your Password?</h2>
          <p>Don't worry, it happens to everyone. Follow these steps:</p>
          
          <div className="recovery-steps">
            <div className="recovery-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Enter Your Email</h4>
                <p>Provide the email address associated with your account</p>
              </div>
            </div>
            <div className="recovery-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Check Your Inbox</h4>
                <p>We'll send you a secure link to reset your password</p>
              </div>
            </div>
            <div className="recovery-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Create New Password</h4>
                <p>Create a strong, unique password for your account</p>
              </div>
            </div>
          </div>
          
          <div className="recovery-note">
            <QuestionCircleOutlined style={{ fontSize: '24px', color: '#52bfcb' }} />
            <p>If you're still having trouble, please contact our support team for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
