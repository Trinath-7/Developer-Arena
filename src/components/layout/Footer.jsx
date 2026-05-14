import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LucideLink, Share2, Globe, Mail, Phone, MapPin, Moon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/60 text-slate-500 pt-24 pb-12 relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary-50/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="relative bg-slate-900 text-white p-2.5 rounded-xl shadow-md hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
                <Moon size={16} className="text-white fill-white" />
              </div>
              <span className="font-display font-black text-xl tracking-[0.2em] text-slate-900 uppercase">
                M<span className="text-primary-500">oo</span><span className="text-slate-400 group-hover:text-slate-900 transition-colors">un</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-8 tracking-wide font-medium">
              Architecting premium, forward-thinking technology and physical apparatus for modern existence. Precision engineered, curated for the future.
            </p>
            <div className="flex space-x-4">
              {[LucideLink, Share2, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all duration-300 shadow-sm">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 font-mono">COLLECTIVE</h4>
            <ul className="space-y-4 text-xs font-bold tracking-wide">
              {['All Products', 'Wearables', 'Audio Systems', 'Core Computations'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-slate-400 hover:text-slate-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 font-mono">SYNDICATE</h4>
            <ul className="space-y-4 text-xs font-bold tracking-wide">
              {['Protocols', 'Terminal Support', 'Careers', 'Data Matrix'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 font-mono">CONTACT NODES</h4>
            <ul className="space-y-5 text-xs text-slate-400 font-bold leading-relaxed">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Sector 7, Innovation Grid 942, Global</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-slate-400 flex-shrink-0" />
                <span className="font-semibold">+1 (555) 900-MOOUN</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-slate-400 flex-shrink-0" />
                <span className="font-semibold">interfaces@mooun.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 tracking-[0.1em] uppercase">
            © {currentYear} MOOUN Syndicate. All operations logged.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-4 opacity-40 hover:opacity-90 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="Mastercard" className="h-4 opacity-40 hover:opacity-90 transition-opacity" />
            <img src="https://cdn-icons-png.flaticon.com/128/196/196566.png" alt="PayPal" className="h-4 opacity-40 hover:opacity-90 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
