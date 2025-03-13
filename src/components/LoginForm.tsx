
import React, { useState } from 'react';
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
  CloseCircleFilled
} from '@ant-design/icons';
import '../styles/login.css';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  
  const handleLogin = async (values: { email: string; password: string }) => {
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, let's assume login is successful if email contains "admin"
      if (email.includes('admin')) {
        setLoginStatus('success');
        
        // Show success notification
        notification.success({
          message: 'Login successful',
          description: 'Welcome back to SecureID',
        });
        
        // Redirect after successful animation
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setLoginStatus('error');
        
        // Show error notification
        notification.error({
          message: 'Login failed',
          description: 'Invalid email or password',
        });
        
        // Reset to idle after error animation
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
    <div className="login-card">
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        size="large"
        layout="vertical"
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
            />
          </Form.Item>
          <div style={{ textAlign: 'right', marginTop: '-20px', marginBottom: '20px' }}>
            <a href="#" style={{ fontSize: '14px', color: '#1677ff' }}>
              Forgot Password?
            </a>
          </div>
        </div>
        
        <div className="login-form-item">
          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={loading}
            icon={getButtonIcon()}
            style={{
              background: loginStatus === 'success' ? '#52c41a' : 
                        loginStatus === 'error' ? '#ff4d4f' : '#1677ff'
            }}
            disabled={loading && loginStatus === 'idle'}
          >
            {loading ? '' : loginStatus === 'success' ? 'Success' : loginStatus === 'error' ? 'Error' : 'Sign In'}
          </Button>
        </div>
      </Form>
      
      <Divider className="login-divider">or continue with</Divider>
      
      <div className="social-login">
        <div className="social-login-button">
          <GithubOutlined style={{ fontSize: '20px', color: '#333' }} />
        </div>
        <div className="social-login-button">
          <GoogleOutlined style={{ fontSize: '20px', color: '#ea4335' }} />
        </div>
      </div>
      
      <div className="login-footer">
        Don't have an account? <a href="#" style={{ color: '#1677ff' }}>Sign up</a>
      </div>
    </div>
  );
};

export default LoginForm;
