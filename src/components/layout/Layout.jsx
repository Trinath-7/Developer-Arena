import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Background3D from './Background3D';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent">
      <Background3D />
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
