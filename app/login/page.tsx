"use client";
import { redirect } from 'next/navigation'; // Use 'next/navigation' for client-side navigation
import { useState } from 'react';
// import { useRouter } from 'next/router';

export default function LoginPage() {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fake login check — replace with real API call
    if (email === 'admin@example.com' && password === 'password123') {
      // Set cookie manually (for demo only; use secure cookie headers in production)
      document.cookie = 'auth-token=valid-token; path=/';
      // 
      // Redirect to dashboard
      redirect('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
