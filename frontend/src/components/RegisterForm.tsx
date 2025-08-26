import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import './LoginForm.css';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [submitError, setSubmitError] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      setSubmitError('');
      
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      reset();
      onSuccess();
    } catch (error: any) {
      setSubmitError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      
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
              },
              maxLength: {
                value: 50,
                message: 'Username must be less than 50 characters'
              }
            })}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && (
            <span className="field-error">{errors.username.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match'
            })}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="field-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-btn"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="form-switch">
        <p>
          Already have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            className="switch-btn"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;