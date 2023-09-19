document.addEventListener('DOMContentLoaded', function () {
    function getWeatherData() {
        const apiKey = '37252414f8b95e6947fb0244c95c461d';
        const locationInput = document.getElementById('LocationInput').value;
        const weatherInfo = document.querySelector('.weather-information');

        if (locationInput.trim() === '') {
            alert('Please enter a location.');
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

        console.log('API URL:', apiUrl);

        fetch(apiUrl)
            .then((response) => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const weatherData = data.weather[0];
                weatherInfo.innerHTML = `
                    <div class="weather-data">
                        <div class="weather-icon">${weatherData.description}</div>
                        <div class="temperature">${data.main.temp}°C</div>
                        <div class="weather-description">${weatherData.main}</div>
                    </div>
                `;
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to fetch weather data. Please try again later.');
            });
    }

    const searchButton = document.getElementById('SearchButton');
    searchButton.addEventListener('click', getWeatherData);
});
