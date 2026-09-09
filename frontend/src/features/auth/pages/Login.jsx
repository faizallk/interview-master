import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@base-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export default function Login() {
 const {loading , handleLogin } = useAuth()
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 transition-colors"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 transition-colors"
            />
          </div>

          <Button
            type="submit"
            disabled={loading && true}
            className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
           {loading ? "Loging..." : 'Log In'}
          </Button>
        </form>
        <p className='text-slate-700 text-center text-sm my-3'>Don't have account? <Link className='text-blue-600 font-medium' to={'/register'}>Register</Link></p>

      </div>
    </div>
  );
}