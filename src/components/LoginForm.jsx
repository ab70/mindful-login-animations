
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Divider, notification, Spin } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone, 
  ArrowRightOutlined,
  GithubOutlined,
  GoogleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  UserOutlined,
  SafetyCertificateFilled,
  KeyOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import '../styles/login.css';
import useLoginAnimation from '../hooks/useLoginAnimation';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('idle');
  const navigate = useNavigate();
  const { isVisible: formVisible } = useLoginAnimation({ delay: 300 });
  const { isVisible: socialVisible } = useLoginAnimation({ delay: 900 });
  const { isVisible: footerVisible } = useLoginAnimation({ delay: 1200 });
  
  const [glassActive, setGlassActive] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setGlassActive(true);
    }, 500);
  }, []);
  
  const handleLogin = async (values) => {
    const { email, password } = values;
    
    if (!email || !password) {
      notification.error({
        message: 'Error',
        description: 'Please enter both email and password',
      });
      return;
    }
    
    setLoading(true);
    setLoginStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email.includes('admin')) {
        setLoginStatus('success');
        
        notification.success({
          message: 'Login successful',
          description: 'Welcome back to SecureID',
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setLoginStatus('error');
        
        notification.error({
          message: 'Login failed',
          description: 'Invalid email or password',
        });
        
        setTimeout(() => {
          setLoginStatus('idle');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
      
      notification.error({
        message: 'Login failed',
        description: 'An error occurred, please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getButtonIcon = () => {
    if (loading) {
      return <Spin size="small" />;
    }
    
    if (loginStatus === 'success') {
      return <CheckCircleFilled style={{ color: '#fff' }} />;
    }
    
    if (loginStatus === 'error') {
      return <CloseCircleFilled style={{ color: '#fff' }} />;
    }
    
    return <ArrowRightOutlined />;
  };
  
  return (
    <div className={`login-card ${glassActive ? 'glass-active' : ''}`}>
      <div className="login-card-inner">
        <div className="login-card-icon">
          <SafetyCertificateFilled className="login-shield-icon" />
          <UserOutlined className="login-user-icon" />
        </div>
        
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your secure account</p>
        
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
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
                suffix={<SafetyOutlined className="input-icon-suffix" />}
              />
            </Form.Item>
          </div>
          
          <div className="login-form-item">
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                disabled={loading}
                className="glass-input"
                suffix={<KeyOutlined className="input-icon-suffix" />}
              />
            </Form.Item>
            <div style={{ textAlign: 'right', marginTop: '-20px', marginBottom: '20px' }}>
              <a href="#" className="forgot-password">
                Forgot Password? <QuestionCircleOutlined />
              </a>
            </div>
          </div>
          
          <div className="login-form-item">
            <Button
              type="primary"
              htmlType="submit"
              className={`login-button ${loginStatus === 'success' ? 'success' : ''} ${loginStatus === 'error' ? 'error' : ''}`}
              loading={loading}
              icon={getButtonIcon()}
              disabled={loading && loginStatus === 'idle'}
            >
              {loading ? '' : loginStatus === 'success' ? 'Success' : loginStatus === 'error' ? 'Error' : 'Sign In'}
            </Button>
          </div>
        </Form>
        
        <Divider className={`login-divider ${socialVisible ? 'divider-visible' : ''}`}>or continue with</Divider>
        
        <div className={`social-login ${socialVisible ? 'social-visible' : ''}`}>
          <div className="social-login-button">
            <GithubOutlined style={{ fontSize: '20px', color: '#333' }} />
          </div>
          <div className="social-login-button">
            <GoogleOutlined style={{ fontSize: '20px', color: '#ea4335' }} />
          </div>
          <div className="social-login-button">
            <AppstoreOutlined style={{ fontSize: '20px', color: '#52bfcb' }} />
          </div>
        </div>
        
        <div className={`login-footer ${footerVisible ? 'footer-visible' : ''}`}>
          Don't have an account? <a href="#" className="signup-link">Sign up <ArrowRightOutlined /></a>
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
  );
};

export default LoginForm;
