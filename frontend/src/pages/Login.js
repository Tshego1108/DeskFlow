import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useLocation} from 'react-router-dom';
import {Mail, Lock} from 'lucide-react';
import {AuthContext} from '../context/AuthContext';
import FormInput from '../components/FormInput';

function Login(){
  const {login, api} = useContext(AuthContext);
  const {register, handleSubmit, formState:{errors}} = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.success;

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data);
      if (res.data.user.role === 'Admin') navigate('/admin'); else navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2>Welcome to DeskFlow</h2>
          <p>Sign in</p>
        </div>

        {successMessage && <div className="alert alert--success">{successMessage}</div>}
        {error && <div className="alert alert--error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="employee@deskflow.com"
            register={register}
            rules={{required: 'Email is required'}}
            icon={Mail}
            error={errors.email?.message}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            register={register}
            rules={{required: 'Password is required', minLength: {value: 6, message: 'Minimum 6 characters'}}}
            icon={Lock}
            error={errors.password?.message}
          />

          <button className="button button--primary auth-form__button" type="submit">
            <span>Sign in</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
