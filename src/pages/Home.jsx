import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../store/slices/productsSlice';
import Skeleton from '../components/common/Skeleton';
import Hero3D from '../components/layout/Hero3D';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

  // Most Sold (by high review count proxy)
  const mostSoldProducts = [...items].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  // Suggested (by high rating proxy)
  const suggestedProducts = [...items].sort((a, b) => b.rating - a.rating).slice(0, 8)
    .filter(p => !mostSoldProducts.find(ms => ms.id === p.id)).slice(0, 4);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <Layout>
      {/* Big Centered Hero Section */}
      <section className="relative overflow-hidden min-h-[95vh] lg:min-h-screen flex items-center justify-center bg-transparent relative">
        
        {/* Massive 3D Canvas Nested Directly Behind the Typographic Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] w-[650px] h-[650px] md:w-[850px] md:h-[850px] z-0 select-none pointer-events-auto opacity-90 cursor-grab active:cursor-grabbing scale-[0.85] md:scale-[0.95]">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-indigo-500/5 via-primary-500/10 to-cyan-500/5 blur-[120px] rounded-full scale-90 animate-pulse-slow" />
          <Hero3D />
        </div>

        {/* Crosshair line accents for technological framing */}
        <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-slate-900/[0.03] hidden xl:block" />
        <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-slate-900/[0.03] hidden xl:block" />

        <div className="container-custom relative z-10 w-full flex flex-col items-center py-20 text-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl w-full z-20 flex flex-col items-center"
          >
            {/* Floating Header Protocol Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/80 border border-slate-200/80 shadow-sm px-5 py-2.5 rounded-full mb-12 backdrop-blur-xl pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-[10px] tracking-[0.5em] font-black text-slate-600 uppercase select-none">MOOUN PROTOCOL ACTIVATED</span>
            </div>

            {/* Unique 3D-Masked Typography with Extreme High-Contrast Luminosity Shadow */}
            <h1 className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-display font-black tracking-[0.15em] leading-none mb-8 text-slate-950 select-none flex justify-center items-center pointer-events-auto drop-shadow-[0_4px_25px_rgba(255,255,255,0.95)] pl-[0.15em]">
              M
              <span 
                className="text-transparent relative transition-all duration-500 hover:scale-105 cursor-default block drop-shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                style={{ 
                  WebkitTextStroke: '3px #7c3aed',
                  letterSpacing: '0.15em'
                }}
              >
                OO
              </span>
              UN
            </h1>
            
            {/* High-Readability Paragraph with Translucent White Backglow Overlay */}
            <div className="relative max-w-2xl mx-auto mb-14 px-6 pointer-events-auto">
              <div className="absolute -inset-4 bg-white/50 backdrop-blur-[6px] rounded-3xl -z-10 border border-white/40 shadow-sm" />
              <p className="text-sm sm:text-base md:text-[17px] text-slate-900 leading-relaxed tracking-wide font-black drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] select-none">
                Curated engineering matrices. Fusing high-end performance technology with avant-garde luxury aesthetic systems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto pointer-events-auto">
              <Link to="/shop" className="btn btn-accent w-full sm:w-auto px-12 py-4 text-xs font-black tracking-[0.2em] group shadow-lg hover:shadow-primary-500/20 transition-shadow duration-500">
                ENTER CATALOGUE
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={15} />
              </Link>
              <Link to="/shop" className="btn btn-secondary w-full sm:w-auto px-12 py-4 text-xs font-black tracking-[0.2em] bg-white/80 backdrop-blur-md hover:bg-white">
                SPECTRUM
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Centered Scroll indicator arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10">
          <span className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase">EXPLORE MATRIX</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-slate-400 to-transparent"></div>
        </div>
      </section>

      {/* Specifications Row */}
      <section className="py-16 border-y border-slate-200/60 bg-white relative z-20 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Truck, title: "EXPRESS TRANSIT", desc: "Complimentary Priority Delivery" },
              { icon: ShieldCheck, title: "ENCRYPTED NODES", desc: "Uncompromising Data Integrity" },
              { icon: RefreshCcw, title: "30-DAY TRIAL", desc: "Seamless Exchange Policy" },
              { icon: CreditCard, title: "SEAMLESS LEDGER", desc: "Supports Global Currencies" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group px-4 border-l border-slate-100">
                <div className="text-slate-400 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300 mb-4">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-black text-[11px] tracking-[0.25em] text-slate-900 mb-1 uppercase">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOST SOLD Section */}
      <section className="py-24 relative bg-transparent">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-[10px] tracking-[0.4em] font-black text-primary-600 block mb-2 uppercase font-mono">HIGH TRAFFIC PROTOCOLS</span>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 uppercase">MOST SOLD ITERATIONS</h2>
            </div>
            <Link to="/shop" className="inline-flex items-center text-[11px] font-bold tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors group pb-2 border-b border-transparent hover:border-slate-200 uppercase">
              DISCOVER ALL <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[4/5] bg-slate-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {mostSoldProducts.map((product) => (
                <motion.div key={product.id} variants={itemFade}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SUGGESTED FOR YOU Section */}
      <section className="py-24 pt-0 relative bg-transparent">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <span className="text-[10px] tracking-[0.4em] font-black text-primary-600 block mb-2 uppercase font-mono">ALGORITHMIC SYNAPSE</span>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900 uppercase">SUGGESTED SELECTIONS</h2>
            </div>
            <div className="h-[1px] bg-slate-200 flex-1 mx-10 hidden md:block"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[4/5] bg-slate-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {suggestedProducts.map((product) => (
                <motion.div key={product.id} variants={itemFade}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
