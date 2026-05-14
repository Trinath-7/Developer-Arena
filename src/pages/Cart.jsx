import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, CreditCard } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { removeFromCart, updateQuantity, selectCartSubtotal, selectCartTax, selectCartTotal } from '../store/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shipping = useSelector(state => state.cart.shippingCost);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id, currentQuantity, delta) => {
    const newQty = currentQuantity + delta;
    if (newQty > 0) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  return (
    <Layout>
      <div className="border-b border-slate-200/60 bg-grid-overlay py-14">
        <div className="container-custom">
          <span className="text-[9px] tracking-[0.4em] font-black text-slate-500 block mb-2 uppercase">LEDGER MATRIX</span>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">YOUR BAG</h1>
        </div>
      </div>

      <div className="container-custom py-16">
        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-400">
              <ShoppingCart size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">BAG CURRENTLY EMPTY</h2>
            <p className="text-slate-500 mb-10 text-sm font-semibold max-w-xs mx-auto">No curated selections found in active terminal. Browse iterations to begin.</p>
            <Link to="/shop" className="btn btn-primary px-10 text-xs font-bold uppercase tracking-[0.1em]">
              ENTER CATALOGUE
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Product List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-200/60 transition-all duration-300 relative group shadow-sm hover:border-primary-200"
                  >
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-black text-primary-600 uppercase tracking-[0.2em] block mb-1.5 font-mono">{item.category}</span>
                          <h3 className="text-[16px] font-bold text-slate-900 leading-tight">
                            <Link to={`/product/${item.id}`} className="hover:text-primary-600 transition-colors">
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <p className="font-black text-[17px] text-slate-900 font-mono tracking-tight">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-inner">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-90 transition-all"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-slate-900 font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-90 transition-all"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-slate-400 hover:text-red-500 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300"
                        >
                          <Trash2 size={14} />
                          <span className="hidden sm:inline">Release</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Card */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 sticky top-28 shadow-md shadow-slate-200/20">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8 font-mono">Summary</h3>
              
              <div className="space-y-5 mb-8 text-[13px] font-medium">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-semibold font-mono">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Transit Matrix</span>
                  <span className="text-slate-900 font-semibold font-mono">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax Index</span>
                  <span className="text-slate-900 font-semibold font-mono">₹{tax.toFixed(2)}</span>
                </div>
              </div>
              
              <hr className="border-slate-100 mb-8" />

              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Total</span>
                <span className="text-2xl font-black text-slate-950 font-mono tracking-tight">₹{total.toFixed(2)}</span>
              </div>

              <Link 
                to="/checkout" 
                className="btn btn-accent w-full font-bold text-xs uppercase tracking-[0.15em] py-4 flex items-center justify-center gap-3"
              >
                <CreditCard size={16} />
                Authorize Transaction
              </Link>
              
              <p className="text-[10px] text-center text-slate-400 font-semibold mt-6 leading-relaxed uppercase tracking-wider">
                Protocols executed securely. Final values generated upon ledger entry.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
