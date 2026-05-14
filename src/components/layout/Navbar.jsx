import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, LogOut, Moon 
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { setFilter } from '../../store/slices/productsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({ searchQuery }));
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
    setIsOpen(false);
  };

  return (
    <nav className="glass-nav py-1">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-800 text-white p-2.5 rounded-full shadow-md flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Moon size={20} className="text-white fill-white" />
              </div>
            </div>
            <span className="font-display font-black text-2xl tracking-[0.15em] text-slate-900 flex items-center uppercase">
              M<span className="text-primary-500">OO</span><span className="text-slate-400 group-hover:text-slate-900 transition-colors duration-500">un</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full opacity-0 group-focus-within:opacity-10 blur transition-all duration-500"></div>
              <input
                type="text"
                placeholder="Search specifications..."
                className="relative w-full bg-slate-100 border border-slate-200/60 hover:bg-slate-200/50 hover:border-slate-300/60 focus:border-primary-500/50 focus:bg-white text-slate-900 rounded-full py-2.5 pl-12 pr-4 transition-all duration-300 outline-none text-sm placeholder:text-slate-400 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4.5 top-3 text-slate-400 w-4 h-4 group-focus-within:text-slate-900 transition-colors" />
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/shop" className="text-[11px] font-black tracking-[0.25em] text-slate-500 hover:text-slate-950 transition duration-300">COLLECTIONS</Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/wishlist" className="relative text-slate-500 hover:text-slate-950 transition duration-300 group">
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <Heart className="w-5 h-5 group-hover:text-primary-600 transition-colors" />
                </motion.div>
                <AnimatePresence>
                  {wishlistItems.length > 0 && (
                    <motion.span 
                      key="wishlist-badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-primary-600 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm select-none"
                    >
                      {wishlistItems.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <Link to="/cart" className="relative text-slate-500 hover:text-slate-950 transition duration-300 group">
                <motion.div 
                  whileHover={{ scale: 1.15 }} 
                  whileTap={{ scale: 0.9 }}
                  animate={totalItems > 0 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="w-5 h-5 group-hover:text-slate-900 transition-colors" />
                </motion.div>
                <AnimatePresence mode="wait">
                  {totalItems > 0 && (
                    <motion.span 
                      key={totalItems}
                      initial={{ scale: 0.5, opacity: 0, y: 5 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.5, opacity: 0, y: -5 }}
                      transition={{ type: "spring", stiffness: 600, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-slate-950 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm shadow-slate-950/20 select-none"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>

            <div className="h-4 w-px bg-slate-200"></div>

            {isAuthenticated ? (
              <button onClick={() => dispatch(logout())} className="text-slate-500 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary px-6 py-2.5 text-[11px] tracking-[0.1em]">
                SIGN IN
              </Link>
            )}
          </div>
          
          <button className="md:hidden text-slate-900 hover:text-slate-600 transition" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
