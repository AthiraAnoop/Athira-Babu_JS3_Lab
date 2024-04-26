// server.mjs
import express from 'express';
import axios from 'axios';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the weather directory
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'styles.css'));
});
app.get('/images.jpg', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'images.jpg'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'script.js'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'weather.html'));
});
app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const apiKey = '0fb98056d14c0b3b443c610b4ebe30e9'; 
        //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=kollam&appid=0fb98056d14c0b3b443c610b4ebe30e9&units=metric`;
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const weatherInfo = `${cityName},${country},${temperature}°C,${weatherDescription},${tempMin}°C/${tempMax}°C`;
        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
