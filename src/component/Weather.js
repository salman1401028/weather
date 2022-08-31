//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=3d1d885c04225d9be066b04f4886711b
import React, { useState, useEffect } from 'react';
import './Weather.css'
const Weather = () => {
    const [place, setPlace] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});


    const enteredItem = (event) => {
        setPlace(event.target.value)
    }

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=3d1d885c04225d9be066b04f4886711b`;

            let res = await fetch(url);
            let data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);


    return (
        <div className="parentDiv">
            <h1>Weather Application:-</h1>


            <div className="search">
                <input id="input1" value={place} onChange={enteredItem} />
                <button id="button" onClick={getWeatherInfo} >Search</button>
            </div>






            <div className="result">

                <img id="image1" src='https://iconarchive.com/download/i89287/icons8/ios7/Weather-Partly-Cloudy-Rain.ico'></img>
                <div className='tempWstatusPlace'>
                    <span>{tempInfo.temp}&deg;</span>
                    <span>{tempInfo.weathermood}</span>
                    <div>
                        <span>{tempInfo.name}, {tempInfo.country}</span>
                    </div>


                </div>

                <div className='time'>
                    {new Date().toLocaleString()}
                </div>

                <div className='extra-info'>
                    <div className="two-sided-section extra-info2">
                        <p >
                            <i className={"wi wi-sunset"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            <p>Sunset</p>
                            <p>{tempInfo.sunset}</p>
                        </p>
                    </div>

                    <div className="two-sided-section extra-info2">
                        <p>
                            <i className={"wi wi-humidity"}></i>
                        </p>
                        <p className="extra-info">
                            <p>Humidity</p>
                            <p>{tempInfo.humidity}</p>
                        </p>
                    </div>

                    <div className="two-sided-section extra-info2">
                        <p>
                            <i className={"wi wi-rain"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            <p>Pressure</p>
                            <p>{tempInfo.pressure}</p>
                        </p>
                    </div>

                    <div className="two-sided-section extra-info2">
                        <p>
                            <i className={"wi wi-strong-wind"}></i>
                        </p>
                        <p className="extra-info-leftside">
                            <p>Speed</p>
                            <p>{tempInfo.speed}</p>
                        </p>
                    </div>
                </div>


            </div>
        </div>





    )
}
export default Weather;