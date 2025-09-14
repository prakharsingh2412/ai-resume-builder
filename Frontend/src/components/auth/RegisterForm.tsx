import React, { useState } from 'react';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom'; // 👈 useNavigate instead

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 👈 replaces useHistory

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await register(formData);
      navigate('/login'); // 👈 replaces history.push
    } catch (error) {
      setErrorMessage('Unable to register. Please check your details and try again.');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
