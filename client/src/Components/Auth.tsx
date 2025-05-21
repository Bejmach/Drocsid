import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Input, Link, Alert } from '@mui/joy';
import { useAuth } from '../hooks/AuthContext';

interface AuthFormProps {
  isLogin: boolean;
  switchMode: () => void;
}

const Auth: React.FC<AuthFormProps> = ({ isLogin, switchMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: 300, p: 3, boxShadow: 'md', borderRadius: 'sm' }}>
        <Typography level="h4" sx={{ mb: 2, textAlign: 'center' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>

        {error && <Alert color="danger" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              fullWidth
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
          )}

          <Input
            fullWidth
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <Input
            fullWidth
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <Button fullWidth type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link onClick={switchMode} sx={{ cursor: 'pointer' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Auth;
