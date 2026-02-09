import React, { useState,useEffect, useRef } from 'react'
import'./Weather.css'
import search_icon from '../assets/search.png'
import cloudy from '../assets/cloudy.png'
import rainy from '../assets/rainy.png'
import snow from '../assets/snow.png'
import sun from '../assets/sun.png'
import thunderstrom from '../assets/thunderstorm.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
 
const Weather = () => {
  const inputref=useRef()
  const [weatherData ,setWeatherData] =useState(false)
const allIcons = {
  "01d": sun,
  "01n": sun,
  "02d": cloudy,
  "02n": cloudy,
  "03d": cloudy,
  "03n": cloudy,
  "04d": cloudy,
  "04n": cloudy,
  "09d": rainy,
  "09n": rainy,
  "10d": rainy,
  "10n": rainy,
  "11d": thunderstrom,
  "11n": thunderstrom,
  "13d": snow,
  "13n": snow,
};

  const search =async (city)=>{
    try {
         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const response = await fetch(url);
        const data =await response.json();
        console.log(data);
        const icon =allIcons[data.weather[0].icon]
        setWeatherData({
           humidity:data.main.humidity,
           windspeed:data.wind.speed,
           temperature:Math.floor(data.main.temp),
           location:data.name,
           icon:icon 
        })
    } catch (error) {
      
    }
  }
  useEffect(() => {
  search("Algeria");
}, [])


  return (     
    <div className='weather'>
      
     <div className='search-bar'> 
 
    <input ref={inputref} type='text' placeholder='Search'/>
    <img src={search_icon} alt='' onClick={()=> search(inputref.current.value)}/>
    </div>
    <img src={weatherData.icon}  alt=""  className='weather-icon'/>
    <p className='temp'> {weatherData.temperature} °C </p>
    <p className='place'> {weatherData.location} </p>

    <div className="weather-data">

      <div className="col">
        <img src={humidity} className='humidity-icon'></img>
         <p>{weatherData.humidity}%</p>
        <span>Humidity</span>
      </div>

      <div className="col">
        <img src={wind} className='wind-icon'></img>
        <div>
          <p>{weatherData.windspeed} km/h</p>
          <span>Wind speed</span>
        </div>
      </div>
    </div>   
   </div>
  )
}
 
export default Weather