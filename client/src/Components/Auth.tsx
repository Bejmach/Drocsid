import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Input, Link, Alert } from '@mui/joy';
import { useAuth } from '../hooks/AuthContext';
import styles from '../styles/Components/Auth.module.scss';
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
      console.error(err);
    }
  };

  return (
    <Box className={styles.auth}>
      <Box className={styles.auth__formBox}>
        <Typography level="h4" className={styles.auth__title}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        
        {error && <Alert className={styles.auth__alert}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              className={styles.auth__input}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            className={styles.auth__input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            className={styles.auth__input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button className={styles.auth__button} type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <Typography className={styles.auth__switchText}
          sx={{
            color: 'white',
            mt: 2,
            textAlign: 'center',
            fontSize: '0.875rem'
          }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link className={styles.auth__switchLink} onClick={switchMode}
            sx={{
              '&:hover': {
                textDecoration: 'none'
              }
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Auth;