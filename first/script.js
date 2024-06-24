const apiKey = "589d2c79d25fc719d070de46c9b6b1c9";
const citySearchInput = document.getElementById('city-search-input');
const cityWeatherInfo = document.getElementById('city-weather-info');
const destinationList = document.getElementById('destination-list');
const favoriteList = document.getElementById('favorite-list');

let searchedDestinations = [];

async function searchCityWeather() {
    const city = citySearchInput.value.trim();
    if (city.length === 0) {
        cityWeatherInfo.innerHTML = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        cityWeatherInfo.innerHTML = `
            <div class="city-weather-details">
                <strong>Weather in ${city}:</strong><br>
                Temperature: ${data.main.temp}°C, ${data.weather[0].description}
                <button onclick="saveFavorite('${city}')">Save to Favorites</button>
            </div>
        `;
    } catch (error) {
        cityWeatherInfo.innerHTML = `
            <div class="city-weather-details">
                Error fetching weather data: ${error.message}
            </div>
        `;
    }
}

function saveFavorite(destination) {
    if (!destination) return;

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(destination)) {
        favorites.push(destination);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    }
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteList.innerHTML = '';
    for (const favorite of favorites) {
        const div = document.createElement('div');
        div.className = 'favorite';
        div.innerHTML = `
            <strong>${favorite}</strong>
            <button onclick="removeFavorite('${favorite}')">Remove</button>
        `;
        favoriteList.appendChild(div);
    }
}

function removeFavorite(destination) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav !== destination);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

window.onload = function() {
    loadFavorites();
};
