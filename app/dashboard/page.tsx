"use client";
import { redirect } from 'next/navigation'; // Use 'next/navigation' for client-side navigation


export default function DashboardPage() {
  
  const handleLogout = () => {
    // Clear auth token cookie
    document.cookie = "auth-token=; path=/;";
   redirect('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
