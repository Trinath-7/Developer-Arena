import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/product/FilterSidebar';
import Skeleton from '../components/common/Skeleton';
import { fetchProducts, selectFilteredProducts, setFilter } from '../store/slices/productsSlice';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Shop = () => {
  const dispatch = useDispatch();
  const { loading, filters } = useSelector(state => state.products);
  const products = useSelector(selectFilteredProducts);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSort = (e) => {
    dispatch(setFilter({ sortBy: e.target.value }));
  };

  return (
    <Layout>
      {/* Premium Header */}
      <div className="border-b border-slate-200/60 relative overflow-hidden py-16 bg-grid-overlay">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-custom relative z-10">
          <span className="text-[9px] tracking-[0.4em] font-black text-primary-600 block mb-3 uppercase">CURATED SPECTRUM</span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-3">THE COLLECTIVE</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl">Discover precision engineered interfaces designed for seamless everyday utility.</p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Sidebar Modal Overlay */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
                />
                <motion.div 
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-y-0 left-0 w-80 bg-white z-[70] p-6 lg:hidden shadow-2xl overflow-y-auto border-r border-slate-200"
                >
                  <FilterSidebar isMobile={true} onClose={() => setIsMobileFilterOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-3 text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 shadow-sm text-slate-700 rounded-xl px-5 py-3"
              >
                <Filter size={14} />
                Filters
              </button>

              <div className="hidden lg:block text-xs font-bold tracking-widest text-slate-400 uppercase">
                Showing <span className="text-slate-900">{products.length}</span> iterations
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 hidden sm:inline uppercase">Sort:</span>
                <select 
                  value={filters.sortBy}
                  onChange={handleSort}
                  className="text-xs bg-white border border-slate-200 hover:border-slate-300 shadow-sm rounded-xl px-4 py-3 font-bold text-slate-700 outline-none cursor-pointer transition-colors"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="space-y-5 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Skeleton className="aspect-[4/5] bg-slate-50 rounded-xl" />
                    <div className="px-2 space-y-3">
                      <Skeleton className="h-3 w-1/4 bg-slate-100" />
                      <Skeleton className="h-4 w-3/4 bg-slate-100" />
                      <Skeleton className="h-4 w-1/2 bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {products.map(product => (
                  <motion.div layout key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm">
                <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-100">
                  <SlidersHorizontal size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight uppercase">NO ITERATIONS DETECTED</h3>
                <p className="text-slate-500 text-sm mb-8 font-semibold max-w-xs mx-auto">Please refine your selection matrices or clear search inputs.</p>
                <button 
                  onClick={() => dispatch(setFilter({ category: 'All Products', searchQuery: '' }))}
                  className="btn btn-primary px-8 text-xs font-bold uppercase tracking-[0.1em]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
