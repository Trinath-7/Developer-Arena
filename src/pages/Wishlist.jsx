import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { addToCart } from '../store/slices/cartSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.wishlist.items);

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success('Moved iteration to bag', {
      style: {
        background: '#fff',
        color: '#0f172a',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontSize: '13px',
        letterSpacing: '0.05em'
      },
      icon: '✦'
    });
  };

  return (
    <Layout>
      <div className="border-b border-slate-200/60 bg-grid-overlay py-14">
        <div className="container-custom">
          <span className="text-[9px] tracking-[0.4em] font-black text-slate-500 block mb-2 uppercase font-mono">FAVORITE SPECTRUM</span>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">COLLECTED ITEMS</h1>
        </div>
      </div>

      <div className="container-custom py-16">
        {items.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm max-w-3xl mx-auto">
            <Heart className="mx-auto w-16 h-16 text-slate-400 mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">COLLECTION EMPTY</h2>
            <p className="text-slate-500 mb-10 text-sm font-semibold max-w-xs mx-auto">No saved iterations detected. Begin aggregating from the main spectrum.</p>
            <Link to="/shop" className="btn btn-primary px-10 text-xs font-bold uppercase tracking-[0.1em]">EXPLORE CATALOGUE</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {items.map(item => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-slate-200/60 hover:border-primary-200 transition-all duration-500 rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg flex flex-col h-full"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-slate-50">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-50 z-10" />
                    <button 
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="absolute top-3 right-3 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-slate-400 hover:text-red-500 transition duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary-600 mb-2 line-clamp-1 text-sm transition-colors">{item.title}</h3>
                    <p className="text-lg font-black text-slate-950 font-mono tracking-tight mb-6">₹{item.price.toFixed(2)}</p>
                    
                    <div className="mt-auto pt-5 border-t border-slate-100">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full flex items-center justify-center gap-2.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition-all tracking-[0.05em] uppercase shadow-sm"
                      >
                        <ShoppingCart size={13} />
                        Deposit to Bag
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
