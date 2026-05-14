import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onFinish }) => {
  const [logs, setLogs] = useState([]);
  const [percent, setPercent] = useState(0);

  const bootSequence = [
    "INITIALIZING NEURAL LINK...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING QUANTUM ENCRYPTION...",
    "BYPASSING FIREWALLS...",
    "ACCESSING MAIN_FRAME...",
    "DECRYPTING PRODUCT DATABASE...",
    "SYNCING VIRTUAL DOM...",
    "CALIBRATING 3D ENGINE...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    
    const logInterval = setInterval(() => {
      if (currentLogIndex < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 250);

    const percentInterval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(percentInterval);
          clearInterval(logInterval);
          setTimeout(onFinish, 1000); // Hold briefly at 100%
          return 100;
        }
        return p + Math.floor(Math.random() * 10 + 2);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(percentInterval);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center font-mono overflow-hidden"
      exit={{ 
        scale: 1.5, 
        opacity: 0, 
        filter: "blur(20px)",
        transition: { duration: 1, ease: "easeInOut" } 
      }}
    >
      {/* Scanning line effect */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.8)] z-10"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* CRT flicker overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,#020617_150%)] pointer-events-none opacity-80" />

      <div className="relative z-20 w-full max-w-2xl px-6 flex flex-col h-full justify-center">
        
        {/* Futuristic Hexagon Loader */}
        <div className="flex justify-center mb-12 relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-t-2 border-r-2 border-sky-500 rounded-full opacity-50"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-b-2 border-l-2 border-blue-400 rounded-full absolute top-4 opacity-70"
          />
          <div className="absolute top-0 w-32 h-32 flex items-center justify-center">
            <span className="text-white font-black text-2xl tracking-tighter">
              {Math.min(percent, 100)}<span className="text-sky-500">%</span>
            </span>
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 font-mono text-xs md:text-sm h-64 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />
          
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center text-sky-400 mb-2 shadow-text"
            >
              <span className="text-slate-500 mr-3">[{new Date().toISOString().split('T')[1].substring(0, 8)}]</span>
              <span className="text-sky-300 mr-2">{'>'}</span>
              <span className={index === logs.length - 1 && log !== "SYSTEM READY." ? "animate-pulse" : ""}>
                {log}
              </span>
            </motion.div>
          ))}
          
          {/* Blinking Cursor */}
          {percent < 100 && (
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-sky-400 mt-2 ml-24 inline-block"
            />
          )}
        </div>
        
        <div className="mt-8 text-center w-full">
          <p className="text-slate-600 text-[10px] tracking-[0.4em] uppercase">Security Clearance Level: Alpha</p>
        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
