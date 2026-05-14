import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { registerSuccess } from '../store/slices/authSlice';
import Layout from '../components/layout/Layout';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const newUser = { id: Date.now(), name: formData.name, email: formData.email };
      dispatch(registerSuccess(newUser));
      toast.success('Account created successfully!');
      navigate('/');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/80 shadow-slate-200/30">
          <div className="text-center">
            <h2 className="text-3xl font-display font-extrabold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">Join our platform and enjoy modern convenience</p>
          </div>
          
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><User size={18} /></div>
                  <input
                    name="name" type="text" required value={formData.name} onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail size={18} /></div>
                  <input
                    name="email" type="email" required value={formData.email} onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <input
                    name="password" type="password" required value={formData.password} onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
                  <input
                    name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70"
            >
              {isLoading ? 'Creating account...' : 'Create Free Account'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-600 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
