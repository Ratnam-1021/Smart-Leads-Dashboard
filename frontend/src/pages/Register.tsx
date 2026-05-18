import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { ArrowRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Sales User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      if (response.data.success) {
        const { token, ...user } = response.data.data;
        setAuth(user, token);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#030712] overflow-hidden px-4 py-12">
      
      {/* ServiceHive Themed Background */}
      <div className="absolute inset-0 starry-bg pointer-events-none"></div>
      
      {/* Central Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 shadow-xl">
            <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">GigFlow Leads</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Create an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 italic">Account</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Join the platform and start managing your leads intelligently.
          </p>
        </div>
        
        <div className="bg-black p-8 sm:p-10 rounded-xl border border-gray-800 shadow-2xl relative z-10">
          {error && (
            <div className="mb-6 text-sm font-medium text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name & Last Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none placeholder-gray-500"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none placeholder-gray-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none placeholder-gray-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none cursor-pointer appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Sales User">Sales User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-600 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
