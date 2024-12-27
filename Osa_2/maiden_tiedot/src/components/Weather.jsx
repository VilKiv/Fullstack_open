import React, { useState, useEffect } from 'react';
import weatherService from './../services/weathers';

const Weather = ({ lat, lon }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        weatherService.getWeather(lat, lon)
            .then((data) => {
                setWeatherData(data);
            });
    }, [lat, lon]);

    if (!weatherData) {
        return <p>Loading weatherdata...</p>;
    }

    return (
        <>
            <p>temperature {weatherData.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="sääikoni" />
            <p>wind {weatherData.wind.speed} m/s</p>
        </>

    );
};

export default Weather;