import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Droplets, Wind, Eye, Thermometer, AlertCircle, CloudLightning, Bell } from 'lucide-react';
import axios from 'axios';
import RainEffect from './components/RainEffect';
import SnowEffect from './components/SnowEffect';
import SunEffect from './components/SunEffect';
import CloudEffect from './components/CloudEffect';
import ThreeGlobe from './components/ThreeGlobe';

const API_KEY = '9950cba587384e0abec181302262804';
const BASE_URL = 'https://api.weatherapi.com/v1';

const backgrounds = {
    clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000&auto=format&fit=crop',
    clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2000&auto=format&fit=crop',
    rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop',
    snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2000&auto=format&fit=crop',
    thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=2000&auto=format&fit=crop',
    fog: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2000&auto=format&fit=crop',
    default: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000&auto=format&fit=crop'
};

const getDayName = (epoch) => {
    const today = new Date().toDateString();
    const date = new Date(epoch * 1000);
    if (date.toDateString() === today) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const formatTime = (epoch) => new Date(epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
const formatDate = (epoch) => new Date(epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

export default function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [bgImage, setBgImage] = useState(backgrounds.default);
    const [effect, setEffect] = useState('none'); // 'rain', 'snow', 'sun', 'clouds', 'none'

    const updateBackground = (conditionText) => {
        const text = conditionText.toLowerCase();
        let bgUrl = backgrounds.default;
        let currentEffect = 'none';

        if (text.includes('sunny') || text.includes('clear')) { bgUrl = backgrounds.clear; currentEffect = 'sun'; }
        else if (text.includes('rain') || text.includes('drizzle')) { bgUrl = backgrounds.rain; currentEffect = 'rain'; }
        else if (text.includes('cloud') || text.includes('overcast')) { bgUrl = backgrounds.clouds; currentEffect = 'clouds'; }
        else if (text.includes('snow') || text.includes('ice') || text.includes('blizzard') || text.includes('pellets')) { bgUrl = backgrounds.snow; currentEffect = 'snow'; }
        else if (text.includes('thunder') || text.includes('storm')) { bgUrl = backgrounds.thunderstorm; currentEffect = 'rain'; }
        else if (text.includes('mist') || text.includes('fog')) { bgUrl = backgrounds.fog; currentEffect = 'clouds'; }

        setEffect(currentEffect);
        
        const img = new Image();
        img.src = bgUrl;
        img.onload = () => setBgImage(bgUrl);
    };

    const fetchWeather = async (e) => {
        if (e) e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`);
            setWeatherData(response.data);
            updateBackground(response.data.current.condition.text);
            
            // Send notification if permitted
            if (Notification.permission === 'granted') {
                const iconUrl = response.data.current.condition.icon.startsWith('//') 
                    ? 'https:' + response.data.current.condition.icon 
                    : response.data.current.condition.icon;
                
                new Notification(`SkyCast: ${response.data.location.name}`, {
                    body: `It's currently ${Math.round(response.data.current.temp_c)}°C and ${response.data.current.condition.text}.`,
                    icon: iconUrl
                });
            }
        } catch (err) {
            setError('City not found. Try another.');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            new Notification("SkyCast Weather", { body: "Notifications are already active! You will receive an alert when you search for a city." });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("SkyCast Weather", { body: "Success! You will now receive weather alerts." });
                }
            });
        }
    };

    return (
        <div className="app-container">
            <div className="bg-image" style={{ backgroundImage: `url('${bgImage}')` }} />
            <div className="bg-overlay" />
            
            {/* Dynamic Weather Effects */}
            <RainEffect active={effect === 'rain'} />
            <SnowEffect active={effect === 'snow'} />
            <SunEffect active={effect === 'sun'} />
            <CloudEffect active={effect === 'clouds'} />

            <header className="top-bar">
                <div className="brand">
                    <CloudLightning size={28} /> SkyCast
                </div>
                
                <form onSubmit={fetchWeather} className="search-container">
                    <Search className="search-icon-left" size={20} />
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Search for cities, places..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" id="search-btn">Search</button>
                </form>
                
                <div className="top-actions">
                    <button className="icon-btn" onClick={handleNotificationClick} title="Enable Notifications">
                        <Bell size={20} />
                    </button>
                    {/* Profile button removed as requested */}
                </div>
            </header>

            <div className="dashboard-content">
                <main className={`main-weather ${weatherData ? 'has-content' : ''}`}>
                    <AnimatePresence mode="wait">
                        {!weatherData && !loading && !error && (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="hero-empty"
                            >
                                <ThreeGlobe />
                                <h1>Global Weather</h1>
                                <p>Enter a city name above to get real-time forecasts and conditions.</p>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="spinner"
                            />
                        )}

                        {error && (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="error-message"
                            >
                                <AlertCircle size={48} />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        {weatherData && (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="weather-hero"
                            >
                                <div className="hero-temp">
                                    <h1 id="temperature">{Math.round(weatherData.current.temp_c)}°</h1>
                                    <div className="hero-city">
                                        <h2>{weatherData.location.name}</h2>
                                        <p>{formatTime(weatherData.location.localtime_epoch)} - {formatDate(weatherData.location.localtime_epoch)}</p>
                                    </div>
                                </div>
                                <div className="hero-condition">
                                    <img 
                                        src={weatherData.current.condition.icon.startsWith('//') ? 'https:' + weatherData.current.condition.icon : weatherData.current.condition.icon} 
                                        alt="weather icon" 
                                    />
                                    <span>{weatherData.current.condition.text}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <AnimatePresence>
                    {weatherData && (
                        <motion.aside 
                            initial={{ x: 450, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 450, opacity: 0 }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                            className="sidebar glass"
                        >
                            <div className="sidebar-section">
                                <h3>Weather Details</h3>
                                <div className="details-grid">
                                    <motion.div whileHover={{ y: -5 }} className="detail-box">
                                        <div className="label-row"><Thermometer size={16} color="#38bdf8" /> <span className="label">Feels Like</span></div>
                                        <span className="value">{Math.round(weatherData.current.feelslike_c)}°</span>
                                    </motion.div>
                                    <motion.div whileHover={{ y: -5 }} className="detail-box">
                                        <div className="label-row"><Droplets size={16} color="#38bdf8" /> <span className="label">Humidity</span></div>
                                        <span className="value">{weatherData.current.humidity}%</span>
                                    </motion.div>
                                    <motion.div whileHover={{ y: -5 }} className="detail-box">
                                        <div className="label-row"><Wind size={16} color="#38bdf8" /> <span className="label">Wind</span></div>
                                        <span className="value">{weatherData.current.wind_kph} km/h</span>
                                    </motion.div>
                                    <motion.div whileHover={{ y: -5 }} className="detail-box">
                                        <div className="label-row"><Eye size={16} color="#38bdf8" /> <span className="label">Visibility</span></div>
                                        <span className="value">{weatherData.current.vis_km} km</span>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3>Upcoming Forecast</h3>
                                <div className="forecast-list">
                                    {weatherData.forecast.forecastday.map((day, idx) => (
                                        <motion.div 
                                            key={day.date_epoch}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                            className="forecast-item"
                                        >
                                            <div className="forecast-day">{getDayName(day.date_epoch)}</div>
                                            <div className="forecast-condition">
                                                <img src={day.day.condition.icon.startsWith('//') ? 'https:' + day.day.condition.icon : day.day.condition.icon} alt="icon" width="35" />
                                            </div>
                                            <div className="forecast-temps">
                                                {Math.round(day.day.maxtemp_c)}° <span>{Math.round(day.day.mintemp_c)}°</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
