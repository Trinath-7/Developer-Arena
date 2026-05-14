import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { selectCartSubtotal, selectCartTax, selectCartTotal, clearCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const total = useSelector(selectCartTotal);
  const shipping = useSelector(state => state.cart.shippingCost);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isAuthenticated) {
    toast.error('Please log in to continue to checkout.', {
      style: {
        background: '#fff',
        color: '#0f172a',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      }
    });
    return <Navigate to="/login" replace />;
  }

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/shop" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      dispatch(clearCart());
      toast.success('Order authorized and placed!', {
        style: {
          background: '#fff',
          color: '#0f172a',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        }
      });
    }, 2500);
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center container-custom text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 border border-emerald-100"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h1 className="text-4xl font-display font-black text-slate-900 mb-4 tracking-tight">AUTHORIZATION GRANTED</h1>
          <p className="text-slate-500 mb-10 text-base font-semibold max-w-md">
            Transaction confirmed. Dispatch reference: <span className="font-black font-mono text-slate-900 tracking-tight">#LX-84729</span>.
          </p>
          <Link to="/shop" className="btn btn-primary px-10 py-3.5 text-xs uppercase font-bold tracking-[0.1em]">
            Continue Exploration
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="border-b border-slate-200/60 bg-grid-overlay py-14 mb-12">
        <div className="container-custom">
          <span className="text-[9px] tracking-[0.4em] font-black text-slate-500 block mb-2 uppercase font-mono">TRANSACTION INITIATION</span>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">CHECKOUT</h1>
        </div>
      </div>

      <div className="container-custom pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-8 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black font-mono text-sm">1</div>
                <h2 className="text-lg font-black uppercase text-slate-900 font-mono tracking-wide">Transit Address</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">First Name</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 focus:border-primary-400 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:ring-0 shadow-inner placeholder-slate-400 font-semibold text-slate-900 outline-none transition-all" type="text" placeholder="Arjun" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">Last Name</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 focus:border-primary-400 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:ring-0 shadow-inner placeholder-slate-400 font-semibold text-slate-900 outline-none transition-all" type="text" placeholder="Sharma" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">Address</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 focus:border-primary-400 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:ring-0 shadow-inner placeholder-slate-400 font-semibold text-slate-900 outline-none transition-all" type="text" placeholder="42, Cyber Park Phase III" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">City</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 focus:border-primary-400 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:ring-0 shadow-inner placeholder-slate-400 font-semibold text-slate-900 outline-none transition-all" type="text" placeholder="Bengaluru" />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 font-mono">Pin Code</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 focus:border-primary-400 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:ring-0 shadow-inner placeholder-slate-400 font-semibold text-slate-900 outline-none transition-all font-mono" type="text" placeholder="560001" />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black font-mono text-sm">2</div>
                <h2 className="text-lg font-black uppercase text-slate-900 font-mono tracking-wide">Payment Matrix</h2>
              </div>
              
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-slate-900 font-bold text-sm uppercase tracking-wider font-mono">
                  <CreditCard size={16} className="text-primary-600" />
                  <span>Secured Deck</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 font-mono">Card Number</label>
                    <input required className="w-full bg-white border border-slate-200 focus:border-primary-400 rounded-xl px-4 py-3.5 text-sm focus:ring-0 font-mono placeholder-slate-300 text-slate-900 outline-none" type="text" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 font-mono">Expiry</label>
                      <input required className="w-full bg-white border border-slate-200 focus:border-primary-400 rounded-xl px-4 py-3.5 text-sm focus:ring-0 font-mono placeholder-slate-300 text-slate-900 outline-none" type="text" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 font-mono">CVC</label>
                      <input required className="w-full bg-white border border-slate-200 focus:border-primary-400 rounded-xl px-4 py-3.5 text-sm focus:ring-0 font-mono placeholder-slate-300 text-slate-900 outline-none" type="password" placeholder="•••" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full btn btn-primary py-4.5 rounded-xl text-xs uppercase font-black tracking-[0.15em] shadow-lg mt-6"
            >
              {isProcessing ? 'Executing transaction protocol...' : `Pay ₹${total.toFixed(2)} Now`}
            </button>
          </form>

          {/* Right Summary Panel */}
          <aside className="lg:col-span-5">
            <div className="bg-white border border-slate-200/60 shadow-md shadow-slate-200/20 rounded-3xl p-6 md:p-8 sticky top-28">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6 border-b border-slate-100 pb-4 font-mono">Curated Ledger</h3>
              
              <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-hide">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center font-mono">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400 font-mono font-semibold">₹{item.price.toFixed(2)} each</p>
                    </div>
                    <p className="text-sm font-black text-slate-900 font-mono">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm mb-6 bg-slate-50 p-5 rounded-2xl shadow-inner">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 font-mono">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Transit</span>
                  <span className="text-emerald-600 font-bold font-mono">+₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Matrix Tax</span>
                  <span className="font-bold text-slate-900 font-mono">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center mt-2">
                  <span className="font-black text-slate-500 text-xs uppercase tracking-wider">Aggregate Due</span>
                  <span className="font-black text-slate-950 text-2xl font-mono">₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 items-center justify-center text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mt-4 font-mono">
                <Shield size={14} />
                Secure Encrypted Port
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

const Shield = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export default Checkout;
