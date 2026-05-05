import React from 'react';
import { motion } from 'framer-motion';

export default function SunEffect({ active }) {
    if (!active) return null;
    
    return (
        <div className="sun-effect-container">
            <div className="sun-rays" />
            <motion.div 
                className="sun"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
