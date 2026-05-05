import React from 'react';
import { motion } from 'framer-motion';

export default function CloudEffect({ active }) {
    if (!active) return null;
    
    // Create multiple clouds drifting across the screen
    return (
        <div className="clouds-effect-container">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="cloud"
                    style={{
                        width: Math.random() * 200 + 150 + 'px',
                        height: Math.random() * 80 + 60 + 'px',
                        top: Math.random() * 40 + '%',
                        left: '-300px',
                        opacity: Math.random() * 0.4 + 0.3
                    }}
                    animate={{ x: [0, window.innerWidth + 500] }}
                    transition={{
                        duration: Math.random() * 40 + 40,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 20
                    }}
                />
            ))}
        </div>
    );
}
