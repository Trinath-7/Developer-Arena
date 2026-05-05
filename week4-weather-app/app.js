const API_KEY = '9950cba587384e0abec181302262804';
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const notificationBtn = document.getElementById('notification-btn');
const bgImage = document.getElementById('bg-image');

const heroContent = document.getElementById('hero-content');
const heroEmpty = document.getElementById('hero-empty');
const sidebar = document.getElementById('sidebar');
const sidebarContent = document.getElementById('sidebar-content');
const sidebarLoading = document.getElementById('sidebar-loading');
const sidebarError = document.getElementById('sidebar-error');
const errorMessage = document.getElementById('error-message');

const elements = {
    temp: document.getElementById('temperature'),
    city: document.getElementById('city-name'),
    date: document.getElementById('current-date'),
    icon: document.getElementById('weather-icon'),
    condition: document.getElementById('condition'),
    feelsLike: document.getElementById('feels-like'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    visibility: document.getElementById('visibility'),
    forecastContainer: document.getElementById('forecast-container')
};

// High-quality Unsplash image URLs for different weather conditions
const backgrounds = {
    clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000&auto=format&fit=crop',
    clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2000&auto=format&fit=crop',
    rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop',
    snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2000&auto=format&fit=crop',
    thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?q=80&w=2000&auto=format&fit=crop',
    fog: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2000&auto=format&fit=crop',
    default: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000&auto=format&fit=crop'
};

const updateBackground = (condition) => {
    const text = condition.toLowerCase();
    let bgUrl = backgrounds.default;

    if (text.includes('sunny') || text.includes('clear')) bgUrl = backgrounds.clear;
    else if (text.includes('rain') || text.includes('drizzle')) bgUrl = backgrounds.rain;
    else if (text.includes('cloud') || text.includes('overcast')) bgUrl = backgrounds.clouds;
    else if (text.includes('snow') || text.includes('ice') || text.includes('blizzard') || text.includes('pellets')) bgUrl = backgrounds.snow;
    else if (text.includes('thunder') || text.includes('storm')) bgUrl = backgrounds.thunderstorm;
    else if (text.includes('mist') || text.includes('fog')) bgUrl = backgrounds.fog;

    // Preload image before changing to ensure smooth transition
    const img = new Image();
    img.src = bgUrl;
    img.onload = () => {
        bgImage.style.backgroundImage = `url('${bgUrl}')`;
    };
};

const showState = (state) => {
    sidebarContent.classList.add('hidden');
    sidebarLoading.classList.add('hidden');
    sidebarError.classList.add('hidden');
    
    // Show sidebar when we have active states
    sidebar.classList.remove('hidden');
    
    if (state === 'content') {
        sidebarContent.classList.remove('hidden');
        heroContent.classList.remove('hidden');
        heroEmpty.classList.add('hidden');
    } else if (state === 'loading') {
        sidebarLoading.classList.remove('hidden');
    } else if (state === 'error') {
        sidebarError.classList.remove('hidden');
        heroContent.classList.add('hidden');
        heroEmpty.classList.remove('hidden');
    }
};

const fetchWeather = async (city) => {
    showState('loading');
    try {
        const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`);
        if (!response.ok) throw new Error('City not found. Try another.');
        
        const data = await response.json();
        updateUI(data);
        showState('content');
        
        // Send notification if permitted
        if (Notification.permission === 'granted') {
            let iconUrl = data.current.condition.icon;
            if (iconUrl.startsWith('//')) iconUrl = 'https:' + iconUrl;
            
            new Notification(`SkyCast: ${data.location.name}`, {
                body: `It's currently ${Math.round(data.current.temp_c)}°C and ${data.current.condition.text}.`,
                icon: iconUrl
            });
        }
    } catch (error) {
        errorMessage.textContent = error.message;
        showState('error');
    }
};

const formatTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (epoch) => {
    return new Date(epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
};

const getDayName = (epoch) => {
    const today = new Date().toDateString();
    const date = new Date(epoch * 1000);
    if (date.toDateString() === today) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const updateUI = (data) => {
    // Hero Section Update
    elements.temp.textContent = `${Math.round(data.current.temp_c)}°`;
    elements.city.textContent = data.location.name;
    elements.date.textContent = `${formatTime(data.location.localtime_epoch)} - ${formatDate(data.location.localtime_epoch)}`;
    
    let iconUrl = data.current.condition.icon;
    if (iconUrl.startsWith('//')) iconUrl = 'https:' + iconUrl;
    elements.icon.src = iconUrl;
    elements.condition.textContent = data.current.condition.text;

    // Sidebar Details Grid
    elements.feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°`;
    elements.humidity.textContent = `${data.current.humidity}%`;
    elements.wind.textContent = `${data.current.wind_kph} km/h`;
    elements.visibility.textContent = `${data.current.vis_km} km`;

    // Sidebar Forecast List
    elements.forecastContainer.innerHTML = '';
    const forecastDays = data.forecast.forecastday;

    forecastDays.forEach(day => {
        let fIconUrl = day.day.condition.icon;
        if (fIconUrl.startsWith('//')) fIconUrl = 'https:' + fIconUrl;
        
        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div class="forecast-day">${getDayName(day.date_epoch)}</div>
            <div class="forecast-condition">
                <img src="${fIconUrl}" alt="icon">
            </div>
            <div class="forecast-temps">
                ${Math.round(day.day.maxtemp_c)}° <span>${Math.round(day.day.mintemp_c)}°</span>
            </div>
        `;
        elements.forecastContainer.appendChild(item);
    });

    // Update dynamic background image based on weather
    updateBackground(data.current.condition.text);
};

// Event Listeners
notificationBtn.addEventListener('click', () => {
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
});

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = '';
            searchInput.blur();
        }
    }
});
