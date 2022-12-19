import React, { useEffect, useState } from 'react'
 
// https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=74d1e22a4e08839f2a612cf8f4903ef6
import './style.css';
import WeatherChaild from './WeatherChaild';

const WeatherApp = () => {
  const [searchValue, setSearchvalue] = useState('Hyderabad')
  const [tempInfo,setTempInfo]=useState({})     
  const getWeatherInfo = async () => {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q= ${searchValue}&units=metric&appid=74d1e22a4e08839f2a612cf8f4903ef6`;
        let result = await fetch(url)
        const data = await result.json()
        // console.log(data);

        const { temp, humidity, pressure } = data.main
        const { main: weathermood } = data.weather[0]
        const { name,cod } = data
        const { speed } = data.wind
        const { country, sunset } = data.sys
        
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          cod,
          speed,
          country,
          sunset
        } 
        setTempInfo(myNewWeatherInfo)
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    getWeatherInfo ()
  },[])
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search" placeholder='search ...'
            autoFocus
            id='search' className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchvalue(e.target.value)}
          />
          
          <button className="searchButton"
            type='button' onClick={getWeatherInfo}>Search</button>

        </div>
      </div>
       <WeatherChaild tempInfo={tempInfo}/>
    </>
  )
}

export default WeatherApp