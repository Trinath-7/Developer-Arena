import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    toast.success(isWishlisted ? 'Removed from Favorites' : 'Saved to Favorites', {
      style: {
        background: '#fff',
        color: '#0f172a',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontSize: '13px',
        letterSpacing: '0.05em'
      }
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success('Added to Bag', {
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
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white border border-slate-200/60 hover:border-primary-300/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(15,23,42,0.05)] shadow-sm shadow-slate-200/30"
    >
      <Link to={`/product/${product.id}`} className="block p-3">
        <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-50 relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-50 z-10" />
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition duration-1000 ease-out group-hover:scale-[1.06]"
          />
          
          <div className="absolute top-3 left-3 z-20">
            {product.isNew && (
              <span className="bg-slate-900 text-white text-[9px] font-black px-2.5 py-1.5 rounded-full uppercase tracking-[0.2em]">
                NEW
              </span>
            )}
          </div>

          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-white backdrop-blur-md shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-500 hover:text-red-500 transform hover:scale-110"
          >
            <Heart size={14} className={cn(isWishlisted && "fill-current text-red-500")} />
          </button>
        </div>

        <div className="px-2 pb-3">
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mb-1.5 block font-mono">{product.category}</span>
          <h3 className="font-display font-bold text-[15px] text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-2 tracking-tight">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-5">
            <div>
              <span className="text-[17px] font-black text-slate-900 tracking-tight font-mono">₹{product.price}</span>
            </div>
            
            <motion.button 
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-black transition-colors duration-300"
            >
              <ShoppingBag size={15} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
