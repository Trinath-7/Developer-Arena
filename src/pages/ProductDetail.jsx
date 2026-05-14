import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Star, Heart, ShoppingBag, Check, Shield, Truck, 
  ArrowLeft, Minus, Plus, Share2, Link as LucideLink
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { addToRecentlyViewed } from '../store/slices/productsSlice';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';
import ProductCard from '../components/product/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlistItems.some(item => item.id === id);

  useEffect(() => {
    if (product) {
      dispatch(addToRecentlyViewed(product));
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [id, product, dispatch]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-grid-overlay">
          <p className="text-xl mb-6 font-bold text-slate-400 tracking-wide">PRODUCT RECORD NOT DETECTED</p>
          <Link to="/shop" className="btn btn-primary px-10 text-xs font-bold uppercase tracking-wider">Return to Collective</Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${quantity} Item${quantity > 1 ? 's' : ''} Secured`, {
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

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast.success(isWishlisted ? 'Released from Favorites' : 'Saved to Favorites', {
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

  const decreaseQty = () => quantity > 1 && setQuantity(q => q - 1);
  const increaseQty = () => quantity < product.stock && setQuantity(q => q + 1);

  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Breadcrumb/Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors mb-10 text-xs font-black uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} /> Back to Catalogue
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28">
          {/* Image Gallery */}
          <div className="space-y-5">
            <div className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/60 relative group flex items-center justify-center shadow-sm">
              <img
                src={product.gallery ? product.gallery[selectedImage] : product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
            </div>
            
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm",
                      selectedImage === index ? "border-slate-900 ring-2 ring-slate-900/10 opacity-100 scale-95" : "border-slate-200 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Side */}
          <div className="flex flex-col py-2">
            <div className="mb-5">
              <span className="bg-primary-50 border border-primary-100 text-primary-600 text-[10px] font-black px-3.5 py-2 rounded-full uppercase tracking-[0.25em] inline-block font-mono">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 leading-tight tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center text-amber-500 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Star size={14} fill="currentColor" />
                <span className="ml-2 font-mono">{product.rating}</span>
              </div>
              <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">{product.reviews} logged reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">
                ₹{product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-slate-400 line-through font-mono font-medium">
                  ₹{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-3 mb-10 bg-slate-50 border border-slate-200/60 self-start px-4 py-2.5 rounded-2xl">
              <div className={cn("w-2 h-2 rounded-full relative", product.stock > 0 ? "bg-emerald-500" : "bg-red-500")}>
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", product.stock > 0 ? "bg-emerald-400" : "bg-red-400")}></span>
              </div>
              <span className={cn("text-[11px] font-bold tracking-[0.1em] uppercase", product.stock > 0 ? "text-emerald-600" : "text-red-500")}>
                {product.stock > 0 ? `Ready For Dispatch (${product.stock} Left)` : 'Depleted'}
              </span>
            </div>

            {/* Add Action Actions */}
            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                {/* Qty Selector */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full p-1 h-14 w-36 justify-between shadow-inner">
                  <button 
                    onClick={decreaseQty}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-90 transition-all disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-black text-slate-900 font-mono">{quantity}</span>
                  <button 
                    onClick={increaseQty}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-90 transition-all disabled:opacity-30"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-accent rounded-full h-14 font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>

                <button 
                  onClick={handleToggleWishlist}
                  className={cn(
                    "w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm",
                    isWishlisted 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            )}

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-slate-200/60 bg-white shadow-sm rounded-3xl p-6">
              <div className="flex items-center gap-4 text-xs">
                <div className="text-primary-600"><Truck size={18} /></div>
                <div>
                  <p className="font-black text-slate-900 tracking-wider uppercase text-[10px] mb-0.5">Fast Transit</p>
                  <p className="text-slate-500 font-semibold leading-relaxed">Global Shipping Matrix</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="text-primary-600"><Shield size={18} /></div>
                <div>
                  <p className="font-black text-slate-900 tracking-wider uppercase text-[10px] mb-0.5">Guaranteed</p>
                  <p className="text-slate-500 font-semibold leading-relaxed">24-Month Protocols</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="text-primary-600"><Check size={18} /></div>
                <div>
                  <p className="font-black text-slate-900 tracking-wider uppercase text-[10px] mb-0.5">Encrypted</p>
                  <p className="text-slate-500 font-semibold leading-relaxed">Secure Ledger Entry</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center mt-10 gap-5 text-xs text-slate-500 font-bold tracking-widest uppercase">
              <span>Propagate:</span>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center transition-colors"><Share2 size={13} /></button>
                <button className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center transition-colors"><LucideLink size={13} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Tab */}
        {product.specs && (
          <div className="mb-28 max-w-3xl">
            <h3 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-slate-900 border-b border-slate-200/60 pb-4 font-mono">Specifications Matrix</h3>
            <div className="border border-slate-200/60 bg-white shadow-sm rounded-2xl overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={cn("grid grid-cols-3 p-5 text-[13px] transition-colors hover:bg-slate-50", i % 2 === 0 ? "bg-transparent" : "bg-slate-50/40 border-t border-slate-100")}>
                  <span className="font-black text-slate-500 tracking-wide font-mono uppercase text-[11px]">{key}</span>
                  <span className="col-span-2 text-slate-900 font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-12 border-t border-slate-200/60">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 font-mono">You might also like</h3>
              <div className="h-[1px] flex-1 bg-slate-200 mx-8 hidden md:block"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
