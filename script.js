//script.js
const getWeather = async () => {
    try {
        const city = document.getElementById('cityInput').value;
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        // Get the current date
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(',', '');


        const [cityName, country, temperature, weatherDescription, temperatureRange] = data.split(',');
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <p>${formattedDate}</p>
            <h1 style="text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">${temperature}</h1>
            <p style="font-style: italic; font-weight: bold;">${weatherDescription}</p>
            <p><strong>${temperatureRange}</strong></p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = '<p>Error fetching weather data</p>';
    }
};

// Listen for keyup event on the input field
document.getElementById('cityInput').addEventListener('keyup', function(event) {
    // Check if the Enter key is pressed (keyCode 13)
    if (event.keyCode === 13) {
        // Prevent the default action of form submission
        event.preventDefault();
        // Call the getWeather function to fetch weather data
        getWeather();
    }
});
