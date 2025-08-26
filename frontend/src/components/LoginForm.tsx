import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import './LoginForm.css';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [submitError, setSubmitError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      setSubmitError('');
      await login(data);
      reset();
      onSuccess();
    } catch (error: any) {
      setSubmitError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      
      {(error || submitError) && (
        <div className="error-message">
          {error || submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters'
              }
            })}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && (
            <span className="field-error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-btn"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="form-switch">
        <p>
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            className="switch-btn"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;