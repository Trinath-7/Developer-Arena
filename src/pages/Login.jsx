import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { loginUser, clearAuthError } from '../store/slices/authSlice';
import Layout from '../components/layout/Layout';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    // Clear previous errors on mount
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/shop');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultAction = await dispatch(loginUser({ 
      email: formData.email, 
      password: formData.password 
    }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success(`Welcome back, ${resultAction.payload.name}!`);
    } else {
      toast.error(resultAction.payload || 'Authentication matrix rejection');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-transparent relative z-10">
        <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/80 shadow-slate-200/30">
          <div className="text-center">
            <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-bold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-500">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-secondary-900 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-secondary-900 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 text-xs text-amber-800">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <p><strong>Quick Note:</strong> You can type any email and password to sign in for this demonstration.</p>
          </div>

          <div className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 underline decoration-dotted underline-offset-4">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
