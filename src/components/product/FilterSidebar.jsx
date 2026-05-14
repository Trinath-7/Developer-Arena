import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORIES } from '../../services/mockData';
import { setFilter, resetFilters } from '../../store/slices/productsSlice';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

const FilterSidebar = ({ isMobile = false, onClose = () => {} }) => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector(state => state.products.filters);

  const handleCategoryChange = (cat) => {
    dispatch(setFilter({ category: cat }));
    if (isMobile) onClose();
  };

  const handleSortChange = (e) => {
    dispatch(setFilter({ sortBy: e.target.value }));
    if (isMobile) onClose();
  };

  return (
    <div className="space-y-8 pr-4">
      {isMobile && (
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h2 className="font-display font-black text-xl tracking-widest text-slate-900">FILTERS</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 font-mono">CATEGORIES</h3>
        <div className="flex flex-col space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "text-left px-4 py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300",
                category === cat 
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className="pt-4 border-t border-slate-200/60">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 font-mono">SORT BY</h3>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-xl text-xs font-semibold text-slate-700 focus:outline-none shadow-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Action */}
      <button 
        onClick={() => dispatch(resetFilters())}
        className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-[11px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-300 mt-6 shadow-sm"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
